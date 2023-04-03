import { Pipe, PipeTransform } from '@angular/core';
import { NotificationsWithSenderName } from '../client-dash-notification-view/client-dash-notification-view.component';

@Pipe({
  name: 'notificationFilter'
})
export class NotificationFilterPipe  implements PipeTransform {

  transform(notifications: NotificationsWithSenderName[], searchTerm: any): any {
    if (!searchTerm) {
      return notifications;
    }
    
    searchTerm = searchTerm.toLowerCase();
    
    return notifications.filter(notification => {
      const createdDate = notification.createdAt ? new Date(notification.createdAt) : undefined;
      const dateString = createdDate?.toISOString();
      return (
        dateString?.includes(searchTerm) ||
        notification.message?.toLowerCase().includes(searchTerm) ||
        notification.senderName?.toLowerCase().includes(searchTerm)
      );
    });
  }

}
