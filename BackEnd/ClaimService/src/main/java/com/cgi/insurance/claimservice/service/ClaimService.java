package com.cgi.insurance.claimservice.service;

import java.util.List;

import com.cgi.insurance.claimservice.exception.ClaimIdAlreadyExistsException;
import com.cgi.insurance.claimservice.exception.ClaimNotFoundException;
import com.cgi.insurance.claimservice.exception.DocumentIdAlreadyExistsException;
import com.cgi.insurance.claimservice.model.*;

public interface ClaimService {

	List<Claim> getAllClaims();
	
	Claim getClaimById(String claimId) throws ClaimNotFoundException;
	
	List<Claim> getClaimsByCustomer(String customerId);
	
	List<Claim> getClaimsByCompany(String companyId);
	
	List<Claim> getClaimsByCustomerAndCompany(String companyId, String customerId);
	
	List<Claim> getApprovedClaims(boolean isApproved);
	
	List<Claim> getApprovedClaimsByCompany(boolean isApproved, String companyId);
	
	
	Claim addClaim(Claim claim) throws ClaimIdAlreadyExistsException;
	
	boolean addDocumentToClaim(String claimId, ClaimDocument claimDoc) throws ClaimNotFoundException, DocumentIdAlreadyExistsException;
	
	boolean deleteDocumentFromClaim(String claimId, String docId) throws ClaimNotFoundException;
	
	Claim updateClaimNotes(String claimId, String notes) throws ClaimNotFoundException;
	
	Claim updateClaimDescription(String claimId, String desc) throws ClaimNotFoundException;
	
	Claim updateClaimApproval(String claimId, boolean isApproved) throws ClaimNotFoundException;
	
	Claim updateClaimActive(String claimId, boolean isActive) throws ClaimNotFoundException;
	
	boolean deleteClaim(String claimId) throws ClaimNotFoundException;
}
