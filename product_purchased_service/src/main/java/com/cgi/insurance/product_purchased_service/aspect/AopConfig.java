package com.cgi.insurance.product_purchased_service.aspect;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;


@Configuration
@EnableAspectJAutoProxy
public class AopConfig {
	
	@Bean
	public AspectLogs  getAspect()
	{
		return new AspectLogs();
	}

}

