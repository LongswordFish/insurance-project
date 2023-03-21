package com.cgi.bundleservice.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cgi.bundleservice.model.Bundle;

@Repository
public interface BundleRepository extends MongoRepository<Bundle, String> {
	
}
