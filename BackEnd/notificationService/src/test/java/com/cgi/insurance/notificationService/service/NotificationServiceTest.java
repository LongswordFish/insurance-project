package com.cgi.insurance.notificationService.service;

import org.mockito.InjectMocks;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.cgi.insurance.notificationService.exception.NotificationIdNotFoundException;
import com.cgi.insurance.notificationService.exception.NotificationNotFoundException;
import com.cgi.insurance.notificationService.exception.RecipientIdNotFoundException;
import com.cgi.insurance.notificationService.exception.SenderIDNotFoundException;
import com.cgi.insurance.notificationService.model.Notification;
import com.cgi.insurance.notificationService.repository.NotificationRepo;
import com.cgi.insurance.notificationService.service.NotifiactionServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


public class NotificationServiceTest {
		
	
		@Mock
		private NotificationRepo notifRepository;

		@InjectMocks
		NotifiactionServiceImpl nservice;
		Notification notif;

		private Notification notif1;
	    private List<Notification> nlist;
	    private List<Notification> nlist1;
	    private Optional optional;
	    
	    @BeforeEach
	    public void setUp() {
	        MockitoAnnotations.initMocks(this);

	        notif = new Notification();
	        //notification.setCreatedAt(new Date());
	        notif.setMessage("Hello");
	        notif.setNotificationId("1");;
	        notif.setRead(false);
	        notif.setRecipientId("2");
	        notif.setSenderId("3"); 
	        nlist = new ArrayList<>();
	        nlist.add(notif);
	        
	        notif1 = new Notification();
	        //notification.setCreatedAt(new Date());
	        notif1.setMessage("Hello");
	        notif1.setNotificationId("2");;
	        notif1.setRead(false);
	        notif1.setRecipientId("4");
	        notif1.setSenderId("5");
	        nlist1 = new ArrayList<>();
	        nlist1.add(notif1);
	      
	        optional = Optional.of(notif);
	    }
	    
	    @AfterEach
	    public void tearDown() {
	        notif = null;
	    }
	    
	    @Test
	    public void givennotificationToSaveThenShouldReturnSavedNotification() {
	        when(notifRepository.save(any())).thenReturn(notif);
	        assertEquals(notif, nservice.createNotification(notif));
	        verify(notifRepository, times(1)).save(any());
	    }
	    
	    @Test
	    public void givenSenderIDThenShouldReturnRespectiveNotif() throws SenderIDNotFoundException {
	        when(notifRepository.findBySenderId(anyString())).thenReturn(nlist);
	        List<Notification> retrievedNotif = nservice.viewNotificationsBySender(notif.getSenderId());
	        verify(notifRepository, times(1)).findBySenderId(anyString());

	    }
	    
	    @Test
	    public void givenrecipientIDThenShouldReturnRespectiveNotif() throws RecipientIdNotFoundException {
	        when(notifRepository.findByRecipientId(anyString())).thenReturn(nlist);
	        List<Notification> retrievedNotif = nservice.viewNotificationsByRecipient(notif.getRecipientId());
	        verify(notifRepository, times(1)).findByRecipientId(anyString());

	    }
	    
	    @Test
	    public void givenSenderIDAndRecipientIDThenShouldReturnRespectiveNotif() throws SenderIDNotFoundException, NotificationNotFoundException {
	        when(notifRepository.findBySenderIdAndRecipientId(anyString(),anyString())).thenReturn(nlist);
	        List<Notification> retrievedNotif = nservice.viewNotificationsSentToRecipientBySender(notif.getSenderId(), notif.getRecipientId());
	        verify(notifRepository, times(1)).findBySenderIdAndRecipientId(anyString(),anyString());

	    }
	    
	    @Test
	    void givenNotifIdToDeleteThenShouldReturnDeletedNotif() throws NotificationIdNotFoundException {
	        when(notifRepository.findById(notif.getNotificationId())).thenReturn(optional);
	        boolean deletedBlog = nservice.deleteNotification("1");
	        assertEquals(true, deletedBlog);

	        verify(notifRepository, times(1)).findById(notif.getNotificationId());
	        verify(notifRepository, times(1)).deleteById(notif.getNotificationId());
	    }
	    
	    @Test
	    public void givenNotifToUpdateThenShouldReturnUpdatedNotif() throws NotificationIdNotFoundException {
	        when(notifRepository.findById(notif.getNotificationId())).thenReturn(optional);
	        when(notifRepository.save(notif)).thenReturn(notif);
	        notif.setMessage("SampleNotifforTesting");
	        Notification notif1 = nservice.updateNotification(notif, "1");
	        assertEquals(notif1.getMessage(), "SampleNotifforTesting");
	        verify(notifRepository, times(1)).save(notif);
	        verify(notifRepository, times(1)).findById(notif.getNotificationId());
	    }
	    
	    @Test
	    public void givenNotifToUpdateReadToTrue() throws NotificationIdNotFoundException {
	        when(notifRepository.findById(notif.getNotificationId())).thenReturn(optional);
	        when(notifRepository.save(notif)).thenReturn(notif);
	        notif.setRead(true);
	        Notification notif1 = nservice.notificationIsRead("1");
	        assertEquals(notif1.isRead(), true);
	        verify(notifRepository, times(1)).save(notif);
	        verify(notifRepository, times(1)).findById(notif.getNotificationId());
	    }







}
