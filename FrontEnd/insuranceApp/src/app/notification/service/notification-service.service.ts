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

  deleteNotification(id?: String): Observable<any> {
    console.log(id);
    return this.httpclient.delete(`http://localhost:9098/notifications/remove/${id}`,{responseType: 'text'});
  }

  getCompanyNameBySenderId(id?: String): Observable<any> {
    return this.httpclient.get<any>(`http://localhost:9091/api/company/id/${id}`);
  }

  getClientNameBySenderId(id?: String): Observable<any> {
    return this.httpclient.get<any>(`http://localhost:9092/api/client/${id}`);
  }
}
