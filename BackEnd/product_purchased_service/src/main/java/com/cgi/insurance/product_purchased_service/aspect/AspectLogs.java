package com.cgi.insurance.product_purchased_service.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

@Aspect
public class AspectLogs {
	
	Logger mylog=LoggerFactory.getLogger(AspectLogs.class);
	
	// @Before("execution (* com.cgi.insurance,product_purchased_service.controller.ProductPurchasedController.viewpatients(..))")
	// public void beforeView(JoinPoint jp)
	// {
	// 	mylog.info("View patients is being accessed ..");
	// }
	
	
	@Around("viewPoint()")

	public Object addEmployeeadvice(ProceedingJoinPoint proceedobj) throws Throwable
	{
	 Object obj=proceedobj.proceed();
	 try
	 {
		 ResponseEntity response=(ResponseEntity) obj;
		  
		 //Patient patobj=(Patient) response.getBody();
		 mylog.info("Body is" + response.getBody());
	 }
	 catch(Exception e)
	 {
		 
	 }
	 return obj;
	}
	
	// @After("saveemppoint()")
	// public void afterAdvice(JoinPoint jp)
	// {
	// 	mylog.info("After saving employee successfully , logs created");
	// }
	
	// @AfterThrowing(pointcut="saveemppoint()",throwing="excepobj")
	// public void handleexc( Exception excepobj)
	// {
	// 	mylog.warn("Exception is raised while adding Patient " + excepobj.getMessage());
	// }
	
	
	// @Pointcut("execution (* com.stackroute.patientjpa.controller.PatientController.addpatient(..))")
	// public void saveemppoint()
	// {
		
	// }
	
    @Pointcut("execution (* com.cgi.insurance.product_purchased_service.controller.ProductPurchasedController.view*(..))")
	public void viewPoint()
	{
		
	}

}

