package com.cgi.insurance.notificationService.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cgi.insurance.notificationService.model.Notification;

public interface NotificationRepo extends MongoRepository<Notification, String> {
	List<Notification> findByRecipientId(String recipient);
	List<Notification> findBySenderId(String sender);
	List<Notification> findBySenderIdAndRecipientId(String sender, String Recipient);
}
