//package com.cgi.insurance.notificationService.controller;
//
//import com.cgi.insurance.notificationService.controller.NotificationController;
//import com.cgi.insurance.notificationService.model.Notification;
//import com.cgi.insurance.notificationService.service.NotificationService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//
//@ExtendWith(MockitoExtension.class)
//public class NotificationControllerTest {
//	
//	
//	  private MockMvc mockMvc;
//	    @Mock
//	    NotificationService notificationService;
//	    @InjectMocks
//	    private NotificationController notificationController;
//
//	    private Notification notification;
//	    private List<Notification> nlist;
//	    
//	    @BeforeEach
//	    public void setUp() {
//	        MockitoAnnotations.initMocks(this);
//	        mockMvc = MockMvcBuilders.standaloneSetup(notificationController).build();
//	        notification = new Notification();
//	        //notification.setCreatedAt(new Date());
//	        notification.setMessage("Hello");
//	        notification.setNotificationId("1");;
//	        notification.setRead(false);
//	        notification.setRecipientId("2");
//	        notification.setSenderId("3");
//	        nlist = new ArrayList<>();
//	        nlist.add(notification);
//	    }
//	    
//	    @AfterEach
//	    public void tearDown() {
//	    	notification = null;
//	    }
//	    
//	    @Test
//	    public void givenNotificationToSaveThenShouldReturnSavedNotification() throws Exception {
//	        when(notificationService.createNotification(any())).thenReturn(notification);
//	        mockMvc.perform(post("/notifications/create")
//	                .contentType(MediaType.APPLICATION_JSON)
//	                .content(asJsonString(notification)))
//	                .andExpect(status().isCreated())
//	                .andDo(MockMvcResultHandlers.print());
//	        verify(notificationService).createNotification(any());
//	    }
//	    
//	    @Test
//	    public void givenGetAllNotifsBasedOnRecipientThenShouldReturnListOfThoseNotifs() throws Exception {
//	        when(notificationService.viewNotificationsByRecipient(notification.getRecipientId())).thenReturn(nlist);
//	        mockMvc.perform(MockMvcRequestBuilders.get("/notifications/view/recipient/2")
//	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(notification)))
//	        		.andExpect(MockMvcResultMatchers.status().isOk())
//	                .andDo(MockMvcResultHandlers.print());
//	    }
//	    
//	    @Test
//	    public void givenGetNotifsBasedOnSenderReturnListOfNotifs() throws Exception {
//	        when(notificationService.viewNotificationsBySender(notification.getSenderId())).thenReturn(nlist);
//	        mockMvc.perform(MockMvcRequestBuilders.get("/notifications/view/sender/3")
//	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(notification)))
//	        		.andExpect(MockMvcResultMatchers.status().isOk())
//	                .andDo(MockMvcResultHandlers.print());
//	    }
//	    
//	    @Test
//	    public void givenGetNotifsBasedOnSenderAndRecipientReturnListOfNotifs() throws Exception {
//	        when(notificationService.viewNotificationsSentToRecipientBySender(notification.getSenderId(), notification.getRecipientId())).thenReturn(nlist);
//	        mockMvc.perform(MockMvcRequestBuilders.get("/notifications/view/3/2")
//	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(notification)))
//	        		.andExpect(MockMvcResultMatchers.status().isOk())
//	                .andDo(MockMvcResultHandlers.print());
//	    }
//	    
//	    @Test
//	    public void givenNotificationIdToDeleteThenShouldReturnTrue() throws Exception {
//	        when(notificationService.deleteNotification(notification.getNotificationId())).thenReturn(true);
//	        mockMvc.perform(delete("/notifications/remove/1")
//	                .contentType(MediaType.APPLICATION_JSON)
//	                .content(asJsonString(notification)))
//	                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(MockMvcResultHandlers.print());
//	    }
//	    
//	    @Test
//	    public void givenNotificationToUpdateThenShouldReturnUpdatedNotification() throws Exception {
//	        when(notificationService.updateNotification(any(),any())).thenReturn(notification);
//	        mockMvc.perform(put("/notifications/update/1").contentType(MediaType.APPLICATION_JSON).content(asJsonString(notification)))
//	                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
//	    }
//	    
//	    @Test
//	    public void givenNotificationToUpdateToChangeReadShouldRerturnReadAsChanged() throws Exception {
//	        when(notificationService.notificationIsRead(notification.getNotificationId())).thenReturn(notification);
//	        mockMvc.perform(put("/notifications/changetoread/1").contentType(MediaType.APPLICATION_JSON).content(asJsonString(notification)))
//	                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
//	    }
//
//
//
//
//
//	    public static String asJsonString(final Object obj) {
//	        try {
//	            return new ObjectMapper().writeValueAsString(obj);
//	        } catch (Exception e) {
//	            throw new RuntimeException(e);
//	        }
//	    }
//
//
//
//
//
//}
