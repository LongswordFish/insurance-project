package com.cgi.productMicroservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import com.cgi.productMicroservice.filter.ClientCompanyFilter;
import com.cgi.productMicroservice.filter.CompanyFilter;

@SpringBootApplication
@EnableDiscoveryClient

public class ProductMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductMicroserviceApplication.class, args);
	}

	// Filter for protecting the client routes	
	@Bean
	public FilterRegistrationBean getClientFilter()
	{
		FilterRegistrationBean fbean=new FilterRegistrationBean();
		fbean.setFilter(new CompanyFilter());
		
		fbean.addUrlPatterns("/products/add");
		fbean.addUrlPatterns("/products/update/*");
		fbean.addUrlPatterns("/products/delete/*");
		fbean.addUrlPatterns("/products/delete/products-by-company/*");
		fbean.addUrlPatterns("/products/update/setProductAvailability/*");
		return fbean;
	}
	
//	// Filter for protecting the company routes	
	@Bean
	public FilterRegistrationBean getCompanyFilter()
	{
		FilterRegistrationBean fbean=new FilterRegistrationBean();
		fbean.setFilter(new ClientCompanyFilter());
		fbean.addUrlPatterns("/products/*");
		return fbean;
	}

}
