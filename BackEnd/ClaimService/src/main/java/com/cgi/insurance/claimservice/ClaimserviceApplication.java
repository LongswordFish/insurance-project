package com.cgi.insurance.claimservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.cgi.insurance.claimservice.filter.*;

@SpringBootApplication
public class ClaimserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClaimserviceApplication.class, args);
	}
	
	@Bean
	public FilterRegistrationBean getCompanyFilter()
	{
		FilterRegistrationBean fbean=new FilterRegistrationBean();
		fbean.setFilter(new CompanyFilter());
		fbean.addUrlPatterns("/claim/approve/*");
		fbean.addUrlPatterns("/claim/active/*");
		fbean.addUrlPatterns("/claim/delete/*");
		return fbean;
	}
	
	@Bean
	public FilterRegistrationBean getClientOrCompanyFilter()
	{
		FilterRegistrationBean fbean=new FilterRegistrationBean();
		fbean.setFilter(new ClientOrCompanyFilter());
		fbean.addUrlPatterns("/claim/view/*");
		fbean.addUrlPatterns("/claim/add");
		fbean.addUrlPatterns("/claim/document/*");
		fbean.addUrlPatterns("/claim/update/*");
		return fbean;
	}


}
