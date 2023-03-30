import { Component } from '@angular/core';
import { Notification } from '../model/notification';
import { NotificationServiceService } from '../service/notification-service.service';
@Component({
  selector: 'app-client-dash-notification-view',
  templateUrl: './client-dash-notification-view.component.html',
  styleUrls: ['./client-dash-notification-view.component.css']
})
export class ClientDashNotificationViewComponent {

  notify : Notification = new Notification();
  notifications : Array<Notification> = [];
  // blogService: any;

  constructor(private nservice : NotificationServiceService){
    this.getAllNotificatonsForRecipient("34");
    
  }

  ngOnInit(){
    this.getAllNotificatonsForRecipient("34");
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
    this.nservice.getAllNotificationsForRecipient(recipientid).subscribe(
      (res: Notification[])=>{
        this.notifications=res;
      }
    )
  }

 
  deleteNotification(id ?: String){
    this.nservice.deleteNotification(id).subscribe(
      (res:any)=>{
        console.log(`Delete with id ${id} has been deleted.`);
        this.getAllNotificatonsForRecipient("34");
      },
      (err:{error:any})=>{
        console.log(err.error);
        // alert("Deletion failed");
      }
    )
  }
}
