import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationServiceService } from '../service/notification-service.service';
import { Notification } from '../model/notification';

@Component({
  selector: 'app-send-notifcation-dialog',
  templateUrl: './send-notifcation-dialog.component.html',
  styleUrls: ['./send-notifcation-dialog.component.css']
})
export class SendNotifcationDialogComponent {
   messages?: String;
   senderId = sessionStorage.getItem('Userid') as String | undefined;
  recipientId?:String;
  constructor(
    public dialogRef: MatDialogRef<SendNotifcationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nservice: NotificationServiceService,
    private snackBar: MatSnackBar
  ) { this.recipientId = data.recipientId; }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(): void {
    const notification: Notification = {
      senderId: this.senderId,
      recipientId: this.recipientId,
      message: this.messages
    };
    this.nservice.createNotification(notification).subscribe(
      (      res: any)=>{
        console.log("Created")
        console.log(res)
      },
      (      err: { error: any; })=>{
        console.log(err.error);
        alert("Notification not sent");
      }
    );

    this.dialogRef.close()
    this.snackBar.open('Notification sent!', 'Close', {
      duration: 2000,
    });
      
  }
}
