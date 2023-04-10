package com.cgi.bundleservice.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cgi.bundleservice.model.Bundle;

@Repository
public interface BundleRepository extends MongoRepository<Bundle, String> {
	
//	Optional<Bundle> findByBundleName(String bundlename);	
	 Optional<Bundle> findByCompanyidAndBundleid(String companyId, String bundleId);
}
