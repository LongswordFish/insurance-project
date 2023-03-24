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

import com.cgi.insurance.product_purchased_service.model.ProductPurchased;

@Aspect
public class AspectLogs {
	
	Logger mylog=LoggerFactory.getLogger(AspectLogs.class);
	

   @After("deletePPPoint()")
   public void afterViewPpAdvice(JoinPoint joinPoint)throws Throwable{
		mylog.info("Product Purchased with Id "+joinPoint.getArgs()[0]+" deleted successfully!");
   }
	
   @After("viewPoint()")
   public void allPointAdvice(JoinPoint joinPoint){
    mylog.info("Method invoked for view method: "+joinPoint.getSignature());
   }

	@Around("savePPPoint()")
	public Object addPPadvice(ProceedingJoinPoint proceedobj) throws Throwable
	{
	 Object obj=proceedobj.proceed();
	 try
	 {
		 ResponseEntity response=(ResponseEntity) obj;
		 ProductPurchased ppobj = (ProductPurchased)response.getBody();
		 mylog.info("Save Product Purchased: id-"+ppobj.getPpId()+", productId-"+ppobj.getProductId()+", clientId-"+ppobj.getClientId() );
	 }
	 catch(Exception e)
	 {
		 
	 }
	 return obj;
	}

	@Around("updatePPPoint()")
	public Object updatePPadvice(ProceedingJoinPoint proceedobj) throws Throwable
	{
	 Object obj=proceedobj.proceed();

	 try
	 {
		ResponseEntity response=(ResponseEntity) obj;
		ProductPurchased ppobj = (ProductPurchased)response.getBody();
		mylog.info("Update Product Purchased: id-"+ppobj.getPpId()+", productId-"+ppobj.getProductId()+", clientId-"+ppobj.getClientId() );
	 }
	 catch(Exception e)
	 {
		 
	 }
	 return obj;
	}

	@AfterThrowing(pointcut="savePPPoint() && updatePPPoint() && deletePPPoint()",throwing="excepobj")
	public void handleexc( Exception excepobj)
	{
		mylog.warn("Exception is raised while adding PP " + excepobj.getMessage());
	}
	
	
	@Pointcut("execution (* com.cgi.insurance.product_purchased_service.controller.ProductPurchasedController.addProductPurchased(..))")
	public void savePPPoint()
	{
		
	}

    @Pointcut("execution (* com.cgi.insurance.product_purchased_service.controller.ProductPurchasedController.updateProductPurchased(..))")
	public void updatePPPoint()
	{
		
	}
	
    @Pointcut("execution (* com.cgi.insurance.product_purchased_service.controller.ProductPurchasedController.deleteProductPurchased(..))")
	public void deletePPPoint()
	{
		
	}
    @Pointcut("execution (* com.cgi.insurance.product_purchased_service.controller.ProductPurchasedController.get*(..))")
	public void viewPoint()
	{
		
	}

}

