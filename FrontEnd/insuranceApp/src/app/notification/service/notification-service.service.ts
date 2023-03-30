import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private httpclient: HttpClient) { }

  createNotification(notify: Notification) : Observable<Notification>{
    return this.httpclient.post('http://localhost:9098/notifications/create', notify,{
      headers: new HttpHeaders({"Content-Type":"application/json"})
    })
  }

  getAllNotificationsForRecipient(recipientid?: String): Observable<Array<Notification>>{
    return this.httpclient.get<Array<Notification>>(`http://localhost:9098/notifications/view/recipient/${recipientid}`);
  }

  getAllNotificationsForRecipient23(): Observable<Array<Notification>>{
    return this.httpclient.get<Array<Notification>>(`http://localhost:9098/notifications/view/recipient/23`);
  }

  deleteNotification(id?: String): Observable<any> {
    console.log(id);
    return this.httpclient.delete(`http://localhost:9098/notifications/remove/${id}`);
  }
}
