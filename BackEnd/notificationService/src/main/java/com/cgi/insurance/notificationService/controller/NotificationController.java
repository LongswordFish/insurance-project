package com.cgi.insurance.notificationService.controller;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cgi.insurance.notificationService.exception.NotificationIdNotFoundException;
import com.cgi.insurance.notificationService.exception.NotificationNotFoundException;
import com.cgi.insurance.notificationService.exception.RecipientIdNotFoundException;
import com.cgi.insurance.notificationService.exception.SenderIDNotFoundException;
import com.cgi.insurance.notificationService.model.Notification;
import com.cgi.insurance.notificationService.repository.NotificationRepo;
import com.cgi.insurance.notificationService.service.NotificationService;

@RestController
@RequestMapping("/notifications")
@CrossOrigin
public class NotificationController {

	@Autowired
	NotificationService notifyService;
	
	@Autowired
    NotificationRepo repository;
	
	@PostMapping("create")
	public ResponseEntity createNotification(@RequestBody Notification notifyObj)
	{
		Notification notif;
		try {
			
			notif = notifyService.createNotification(notifyObj);
			
		return new ResponseEntity<Notification>(notif,HttpStatus.CREATED);
		} 
		
		catch (NotificationIdNotFoundException e) {
		 return new ResponseEntity<String>("duplicate id" , HttpStatus.CONFLICT);
		}

	}
	
	@DeleteMapping("remove/{notificationId}")
	public ResponseEntity removeNotif(@PathVariable("notificationId") String notifID)
	{
		try {
			boolean notify=notifyService.deleteNotification(notifID);
			return new ResponseEntity<String>("Deletion succesfull",HttpStatus.OK);
		} catch (NotificationIdNotFoundException e) {
			// TODO Auto-generated catch block
			return new ResponseEntity<String>("Notification id is not available",HttpStatus.NOT_FOUND);
		}
		
	}
	
	@PutMapping("/update/{notificationId}")
	public ResponseEntity<?> updatedNotification(@PathVariable("notificationId") String notifID, @RequestBody Notification notif)
	{
		
	try {
		Notification resultobj=notifyService.updateNotification(notif, notifID);
		return new ResponseEntity<Notification>(resultobj , HttpStatus.OK);
		
	} 
	catch (NotificationIdNotFoundException e)
	{
		return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
		
	}
	
	@PutMapping("/changetoread/{notificationId}")
	public ResponseEntity<?> updatedRead(@PathVariable("notificationId") String notifID)
	{
		
	try {
		Notification resultobj=notifyService.notificationIsRead(notifID);
		return new ResponseEntity<Notification>(resultobj , HttpStatus.OK);
		
	} 
	catch (NotificationIdNotFoundException e)
	{
		return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
	}
		
	}
	
	@GetMapping("view/{senderid}/{recipientid}")
	public ResponseEntity viewbySenderRecipient(@PathVariable("senderid") String sender, @PathVariable("recipientid") String reci) throws NotificationNotFoundException
	{
		List<Notification> notify=notifyService.viewNotificationsSentToRecipientBySender(sender, reci);
		return new ResponseEntity<List<Notification>>(notify,HttpStatus.OK);
	}
	
	@GetMapping("view/sender/{senderid}")
	public ResponseEntity viewbySender(@PathVariable("senderid") String sender) throws SenderIDNotFoundException
	{
		List<Notification> notify=notifyService.viewNotificationsBySender(sender);
		return new ResponseEntity<List<Notification>>(notify,HttpStatus.OK);
	}
	
	@GetMapping("view/recipient/{recipientid}")
	public ResponseEntity viewbyRecipient(@PathVariable("recipientid") String reci) throws RecipientIdNotFoundException
	{
		List<Notification> notify=notifyService.viewNotificationsByRecipient(reci);
		return new ResponseEntity<List<Notification>>(notify,HttpStatus.OK);
	}
	
}
