package com.cgi.bundleservice;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BundleserviceApplicationTests {

	@Test
	void contextLoads() {
		assertNotNull(new BundleserviceApplication());
	}

}
