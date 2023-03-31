package com.cgi.insurance.notificationService.aspect;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

import com.cgi.insurance.notificationService.model.Notification;

@Aspect
public class AspectLogs {
	
	Logger mylog=LoggerFactory.getLogger(AspectLogs.class);
	

   @After("deleteNotifPoint()")
   public void afterViewNotifAdvice(JoinPoint joinPoint)throws Throwable{
		mylog.info("Notification with Id "+joinPoint.getArgs()[0]+" deleted successfully!");
   }
	
   @After("viewPoint()")
   public void allPointAdvice(JoinPoint joinPoint){
    mylog.info("Method invoked for view method: "+joinPoint.getSignature());
   }

	@Around("saveNotifPoint()")
	public Object addNotifadvice(ProceedingJoinPoint proceedobj) throws Throwable
	{
	 Object obj=proceedobj.proceed();
	 try
	 {
		 ResponseEntity response=(ResponseEntity) obj;
		 Notification notifobj = (Notification)response.getBody();
		 mylog.info("Saved Notification: id-"+notifobj.getNotificationId() );
	 }
	 catch(Exception e)
	 {
		 
	 }
	 return obj;
	}

	@Around("updateNotifPoint()")
	public Object updateNotifadvice(ProceedingJoinPoint proceedobj) throws Throwable
	{
	 Object obj=proceedobj.proceed();

	 try
	 {
		ResponseEntity response=(ResponseEntity) obj;
		Notification notifobj = (Notification)response.getBody();
		mylog.info("Updated Notification: id-"+notifobj.getNotificationId() );
	 }
	 catch(Exception e)
	 {
		 
	 }
	 return obj;
	}

	@AfterThrowing(pointcut="saveNotifPoint() && updateNotifPoint() && deleteNotifPoint()",throwing="excepobj")
	public void handleexc( Exception excepobj)
	{
		mylog.warn("Exception is raised while adding Notif " + excepobj.getMessage());
	}
	
	
	@Pointcut("execution (* com.cgi.insurance.notificationService.controller.NotificationController.createNotification(..))")
	public void saveNotifPoint()
	{
		
	}

    @Pointcut("execution (* com.cgi.insurance.notificationService.controller.NotificationController.updatedNotification(..))")
	public void updateNotifPoint()
	{
		
	}
	
    @Pointcut("execution (* com.cgi.insurance.notificationService.controller.NotificationController.removeNotif(..))")
	public void deleteNotifPoint()
	{
		
	}
    @Pointcut("execution (* com.cgi.insurance.notificationService.controller.NotificationController.viewby*(..))")
	public void viewPoint()
	{
		
	}

}