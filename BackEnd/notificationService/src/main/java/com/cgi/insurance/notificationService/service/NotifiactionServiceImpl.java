package com.cgi.insurance.notificationService.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cgi.insurance.notificationService.exception.NotificationIdNotFoundException;
import com.cgi.insurance.notificationService.exception.NotificationNotFoundException;
import com.cgi.insurance.notificationService.exception.RecipientIdNotFoundException;
import com.cgi.insurance.notificationService.exception.SenderIDNotFoundException;
import com.cgi.insurance.notificationService.model.Notification;
import com.cgi.insurance.notificationService.repository.NotificationRepo;

@Service
public class NotifiactionServiceImpl implements NotificationService {
	
	@Autowired
	NotificationRepo notifyRepo;

	@Override
	public List<Notification> viewNotificationsByRecipient(String recipientId) throws RecipientIdNotFoundException {
		// TODO Auto-generated method stub
		List<Notification> Notif = notifyRepo.findByRecipientId(recipientId);
		if (Notif.isEmpty()){
			throw new RecipientIdNotFoundException("Recipient ID could not be found");
		}
		return Notif;
		
	}

	@Override
	public List<Notification> viewNotificationsBySender(String senderId) throws SenderIDNotFoundException{
		List<Notification> Notif = notifyRepo.findBySenderId(senderId);
		if (Notif.isEmpty()){
			throw new SenderIDNotFoundException("Sender ID could not be found");
		}
		return Notif;
	}

	@Override
	public List<Notification> viewNotificationsSentToRecipientBySender(String senderId, String recipientId) throws NotificationNotFoundException {
		// TODO Auto-generated method stub
		List<Notification> Notif = notifyRepo.findBySenderIdAndRecipientId(senderId, recipientId);
		if (Notif.isEmpty()){
			throw new NotificationNotFoundException("Could not find any notification");
		}
		return Notif;
	}

	@Override
	public Notification createNotification(Notification notifyObj) {
		// TODO Auto-generated method stub		
//			notifyObj.setCreatedAt(new SimpleDateFormat(dd/MM/yy).format(new Date()));
			
			Notification notification=	notifyRepo.save(notifyObj);
			return notification;		
	}

	@Override
	public boolean deleteNotification(String notificationId) throws NotificationIdNotFoundException {
		Optional<Notification> optNotif=notifyRepo.findById(notificationId);
		
		if(optNotif.isPresent()) {
			notifyRepo.deleteById(notificationId);
			return true;
		}
		else {
			throw new NotificationIdNotFoundException("Notification Not found");
		}
	}

	@Override
	public Notification updateNotification(Notification notification, String notificationId) throws NotificationIdNotFoundException {
		// TODO Auto-generated method stub
		Optional<Notification> existingNotif = notifyRepo.findById(notificationId);
		if(existingNotif.isPresent()) {
			
			Notification notifi = existingNotif.get();
			notifi.setSenderId(notification.getSenderId());
			notifi.setMessage(notification.getMessage());
			notifi.setRecipientId(notification.getRecipientId());
			notifyRepo.save(notifi);
			return notifi;
			
		}
		else {
			throw new NotificationIdNotFoundException("Notification ID is not available");
		}
	}

	@Override
	public Notification notificationIsRead(String notificationId) throws NotificationIdNotFoundException {
		// TODO Auto-generated method stub
		Optional<Notification> existingNotif = notifyRepo.findById(notificationId);
		if(existingNotif.isPresent()) {
			Notification notif = existingNotif.get();
			notif.setRead(true);
			notifyRepo.save(notif);
			return notif;
		}
		else {
			throw new NotificationIdNotFoundException("Notification ID is not available");
		}
		
	}

}
