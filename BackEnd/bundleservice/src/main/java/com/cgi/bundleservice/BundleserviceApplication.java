package com.cgi.bundleservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class BundleserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BundleserviceApplication.class, args);
	}

}
