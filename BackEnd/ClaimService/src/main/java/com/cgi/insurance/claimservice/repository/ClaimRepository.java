package com.cgi.insurance.claimservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cgi.insurance.claimservice.model.*;

public interface ClaimRepository extends MongoRepository<Claim, String> {

	List<Claim> findByCustomerId(String customerId);
	
	List<Claim> findByCompanyId(String companyId);
	
	List<Claim> findByCustomerIdAndCompanyId(String customerId, String companyId);
	
	List<Claim> findByIsApproved(boolean isApproved);
	
	List<Claim> findByIsApprovedAndCompanyId(boolean isApproved, String companyId);
}
