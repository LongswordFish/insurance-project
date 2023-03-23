package com.cgi.insurance.claimservice.aopconfig;

import java.time.LocalDateTime;

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


import com.cgi.insurance.claimservice.model.*;

@Aspect
public class AspectLogs {

	Logger mylogger = LoggerFactory.getLogger(AspectLogs.class);
	
	@Around("saveClaimPoint()")
	public Object addClaimAdvice(ProceedingJoinPoint proceedobj) throws Throwable{
		Object obj=proceedobj.proceed();
		
		try {
			ResponseEntity response=(ResponseEntity) obj;
			
			Claim claimobj = (Claim)response.getBody();
			
			mylogger.info("New Claim " + claimobj.getClaimId() + " Added For Client " + claimobj.getCustomerId() + " With Company " + claimobj.getCompanyId());
		
		}catch(Exception e) {
			
		}
		return obj;
	}
	
	@Around("saveClaimPoint()")
	public Object addDocumentAdvice(ProceedingJoinPoint proceedobj) throws Throwable{
		Object obj=proceedobj.proceed();
		
		try {
			ResponseEntity response=(ResponseEntity) obj;
			
			String strres = (String) response.getBody();
			
			mylogger.info(strres);
			
			}catch(Exception e) {
			
		}
		return obj;
	}
	
	@Around("deleteClaimPoint()")
	public Object deleteClaimAdvice(ProceedingJoinPoint proceedobj) throws Throwable{
		Object obj=proceedobj.proceed();
		
		try {
			ResponseEntity response=(ResponseEntity) obj;
			
			String strres = (String) response.getBody();
			
			mylogger.info(strres);
			
		}catch(Exception e) {
			
		}
		return obj;
	}
	
	@Around("deleteDocumentPoint()")
	public Object deleteDocumentAdvice(ProceedingJoinPoint proceedobj) throws Throwable{
		Object obj=proceedobj.proceed();
		
		try {
			ResponseEntity response=(ResponseEntity) obj;
			
			String strres = (String) response.getBody();
			
			mylogger.info(strres);
			
		}catch(Exception e) {
			
		}
		return obj;
	}
	
	@Around("updateClaimPoint()")
	public Object updateClaimAdvice(ProceedingJoinPoint proceedobj) throws Throwable{
		Object obj=proceedobj.proceed();
		
		try {
			ResponseEntity response=(ResponseEntity) obj;
			
			Claim claimobj = (Claim)response.getBody();
			
			mylogger.info("Updated Claim " + claimobj.getClaimId());
		
		}catch(Exception e) {
			
		}
		return obj;
	}
	
	
	@Pointcut("execution (* com.cgi.insurance.claimservice.controller.ClaimController.addClaim(..))")
	public void saveClaimPoint(){
			
	}
	
	@Pointcut("execution (* com.cgi.insurance.claimservice.controller.ClaimController.addDocumentToClaim(..))")
	public void saveDocumentPoint(){
			
	}
	
	
	@Pointcut("execution (* com.cgi.insurance.claimservice.controller.ClaimController.deleteClaim(..))")
	public void deleteClaimPoint(){
			
	}
	
	@Pointcut("execution (* com.cgi.insurance.claimservice.controller.ClaimController.deleteDocumentFromClaim(..))")
	public void deleteDocumentPoint(){
			
	}
	
	@Pointcut("execution (* com.cgi.insurance.claimservice.controller.ClaimController.update*(..))")
	public void updateClaimPoint(){
			
	}
	

	
}
