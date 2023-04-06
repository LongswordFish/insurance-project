package com.cgi.insurance.Review;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import com.cgi.insurance.Review.filter.ClientFilter;

@SpringBootApplication
public class ReviewApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReviewApplication.class, args);
	}
	
	@Bean
	 public FilterRegistrationBean getClientFilter()
	 {
	 	FilterRegistrationBean fbean=new FilterRegistrationBean();
	 	fbean.setFilter(new ClientFilter());
	 	fbean.addUrlPatterns("/review/add");
	 	fbean.addUrlPatterns("/review/update");
	 	return fbean;
	 }
	
}
