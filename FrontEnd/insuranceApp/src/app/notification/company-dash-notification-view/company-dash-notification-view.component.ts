import { ChangeDetectorRef, Component } from '@angular/core';
import { Notification } from '../model/notification';
import { NotificationServiceService } from '../service/notification-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SendNotifcationDialogComponent } from '../send-notifcation-dialog/send-notifcation-dialog.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-company-dash-notification-view',
  templateUrl: './company-dash-notification-view.component.html',
  styleUrls: ['./company-dash-notification-view.component.css']
})
export class CompanyDashNotificationViewComponent {

  notify : Notification = new Notification();
  notifications : Array<Notification> = [];
  notificationsWithSenderName : NotificationsWithSenderName[] = [];
  searchTerm:string="";
  currentPage = 1;
  senderName?: String;
  // retrieve the value from sessionStorage
  recipientId = sessionStorage.getItem('Userid') as String | undefined; 
  
   
  
  constructor(private nservice : NotificationServiceService,private dialog: MatDialog, private cdr: ChangeDetectorRef){ 
  }

  ngOnInit(){
    this.getAllNotificatonsForRecipient(this.recipientId);  
  }



  createNotification(){
    this.nservice.createNotification(this.notify).subscribe(
      (      res: any)=>{
        console.log("Created")
        console.log(res)
      },
      (      err: { error: any; })=>{
        console.log(err.error);
        alert("Notification exists, please enter the details again");
      }
    )
  }

  getAllNotificatonsForRecipient(recipientid?: String){
    try{
    this.nservice.getAllNotificationsForRecipient(recipientid).pipe(
      catchError(error => {
        console.log("Error occurred while fetching notifications:", error);
        console.log("Returning empty list.");
        return of([]);
      })
    ).subscribe(
       async (res: Notification[])=>{
        this.notifications=res;
        console.log(res);
        
      // Clear notificationsWithSenderName array before pushing new notifications
        this.notificationsWithSenderName = [];
        console.log(this.notificationsWithSenderName);
        console.log(this.notifications);
        for (let notification of this.notifications) {
         
          if(notification.senderId != null && notification.senderId != undefined){
            console.log(notification.senderId)
            const senderNames = await this.getClientNameBySenderId(notification.senderId);
            console.log(senderNames)
            const sender: String | undefined = this.senderName 
            const notificationWithSenderName: NotificationsWithSenderName = {
              notificationId: notification.notificationId,
              senderId: notification.senderId,
              recipientId: notification.recipientId,
              message: notification.message,
              createdAt: notification.createdAt,
              isRead: notification.read,
              senderName: sender,
            };
            this.notificationsWithSenderName.push(notificationWithSenderName);
            console.log(notificationWithSenderName);
          }
        }
      }
     
     )
    }
    catch(error){
      console.log("Error occurred while fetching notifications:", error);
    console.log("Returning empty list.");
    this.notificationsWithSenderName = [];
    }
  }

 
  deleteNotification(id ?: String){
    this.nservice.deleteNotification(id).subscribe(
      (res:any)=>{
        console.log(`Delete with id ${id} has been deleted.`);
        this.getAllNotificatonsForRecipient("34");
      },
      (err:any)=>{
        console.log(err.error);
        // alert("Deletion failed");
      }
    )

    
  }

  async getClientNameBySenderId(id?: String){
  const res:any = await this.nservice.getClientNameBySenderId(id).toPromise();
  console.log(res.clientName);
  this.senderName = res.clientName;
  return this.senderName;
    
  }

  openNotificationDialog(id: String): void {
    const dialogRef = this.dialog.open(SendNotifcationDialogComponent, {
      width: '300px',
      data: { recipientId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }    
  
}

export interface NotificationsWithSenderName {
  notificationId?: string;
  senderId?: String;
  recipientId?: String;
  message?: String;
  createdAt?: Date;
  isRead?: Boolean;
  senderName?: String;
}
