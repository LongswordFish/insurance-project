package com.cgi.insurance.product_purchased_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.cgi.insurance.product_purchased_service.filter.AdminFilter;
import com.cgi.insurance.product_purchased_service.filter.ClientFilter;
import com.cgi.insurance.product_purchased_service.filter.CompanyFilter;

@SpringBootApplication
public class ProductPurchasedServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductPurchasedServiceApplication.class, args);
	}

	// @Bean
	// public FilterRegistrationBean getAdminFilter()
	// {
	// 	FilterRegistrationBean fbean=new FilterRegistrationBean();
	// 	fbean.setFilter(new AdminFilter());
	// 	fbean.addUrlPatterns("/api/v1/purchased/viewAll");
	// 	return fbean;
	// }

	// @Bean
	// public FilterRegistrationBean getCompanyFilter()
	// {
	// 	FilterRegistrationBean fbean=new FilterRegistrationBean();
	// 	fbean.setFilter(new CompanyFilter());
	// 	fbean.addUrlPatterns("/api/v1/purchased/view/company/*");
	// 	return fbean;
	// }

	// @Bean
	// public FilterRegistrationBean getClientFilter()
	// {
	// 	FilterRegistrationBean fbean=new FilterRegistrationBean();
	// 	fbean.setFilter(new ClientFilter());
	// 	fbean.addUrlPatterns("/api/v1/purchased/add");
	// 	fbean.addUrlPatterns("/api/v1/purchased/delete/*");
	// 	fbean.addUrlPatterns("/api/v1/purchased/update/*");
	// 	fbean.addUrlPatterns("/api/v1/purchased/view/bundle/*");
	// 	fbean.addUrlPatterns("/api/v1/purchased/view/id/*");
	// 	fbean.addUrlPatterns("/api/v1/purchased/view/client/*");
	// 	fbean.addUrlPatterns("/api/v1/purchased/view/notbundle/client/*");
	// 	return fbean;
	// }
}
