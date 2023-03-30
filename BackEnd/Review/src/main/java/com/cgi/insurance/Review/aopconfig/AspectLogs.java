package com.cgi.insurance.Review.aopconfig;

import java.util.logging.Logger;

import org.aspectj.lang.JoinPoint;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;


@Component
@Aspect
public class AspectLogs {
	
	private final Logger logger = Logger.getLogger(getClass().getName());

    @Before("execution(* com.cgi.insurance.Review.controller.ReviewController.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        logger.info("Calling method: " + joinPoint.getSignature().getName());
    }

    @After("execution(* com.cgi.insurance.Review.controller.ReviewController.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        logger.info("Finished calling method: " + joinPoint.getSignature().getName());
    }
}
