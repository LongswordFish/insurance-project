package com.cgi.insurance.notificationService.service;

import java.util.List;

import com.cgi.insurance.notificationService.exception.NotificationIdNotFoundException;
import com.cgi.insurance.notificationService.exception.NotificationNotFoundException;
import com.cgi.insurance.notificationService.exception.RecipientIdNotFoundException;
import com.cgi.insurance.notificationService.exception.SenderIDNotFoundException;
import com.cgi.insurance.notificationService.model.Notification;

public interface NotificationService {
	
	// implementing  /notifications/view/recipient/{recipientId}
	List<Notification> viewNotificationsByRecipient(String recipientId) throws RecipientIdNotFoundException;
	
	// implementing  /notifications/view/sender/{senderId}
	List<Notification> viewNotificationsBySender(String senderId) throws SenderIDNotFoundException;
	
	// implementing  /notifications/view/{senderId}/{recipientId}
	List<Notification> viewNotificationsSentToRecipientBySender(String senderId, String recipientId) throws NotificationNotFoundException;
	
	// implementing  /notifications/create/{senderId}
	Notification createNotification(Notification notifyObj) throws NotificationIdNotFoundException;
	
	// implementing /notifications/remove/{notificationId}
	boolean deleteNotification(String notificationId) throws NotificationIdNotFoundException;
	
	// implementing /notifications/update/{notificationId}
	Notification updateNotification(Notification notification, String notificationId) throws NotificationIdNotFoundException;
	
	// implementing /notifications/changetoread/{notificationId}
	Notification notificationIsRead(String notificationId) throws NotificationIdNotFoundException;
}
