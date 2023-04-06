package com.cgi.productMicroservice.aspectAOP;


//import java.util.Arrays;
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

    @Before("execution(* com.cgi.productMicroservice.controller.ProductController.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        logger.info("Calling method: " + joinPoint.getSignature().getName());
//        logger.info("With arguments: " + Arrays.toString(joinPoint.getArgs()));
    }

    @After("execution(* com.cgi.productMicroservice.controller.ProductController.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        logger.info("Finished calling method: " + joinPoint.getSignature().getName());
    }
}
