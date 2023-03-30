package com.cgi.insurance.claimservice.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cgi.insurance.claimservice.exception.ClaimIdAlreadyExistsException;
import com.cgi.insurance.claimservice.exception.ClaimNotFoundException;
import com.cgi.insurance.claimservice.exception.DocumentIdAlreadyExistsException;
import com.cgi.insurance.claimservice.model.Claim;
import com.cgi.insurance.claimservice.model.ClaimDocument;
import com.cgi.insurance.claimservice.repository.ClaimRepository;

@Service
public class ClaimServiceImpl implements ClaimService{

	@Autowired
	ClaimRepository crepo;
	
	@Override
	public List<Claim> getAllClaims() {

		return crepo.findAll();
	}

	@Override
	public Claim getClaimById(String claimId) throws ClaimNotFoundException {

		Optional<Claim> optc = crepo.findById(claimId);
		
		if(optc.isPresent()) {
			return optc.get();
		}else {
			throw new ClaimNotFoundException();
		}
		 
	}

	@Override
	public List<Claim> getClaimsByCustomer(String customerId) {

		return crepo.findByCustomerId(customerId);
	}

	@Override
	public List<Claim> getClaimsByCompany(String companyId) {

		return crepo.findByCompanyId(companyId);
	}

	@Override
	public List<Claim> getClaimsByCustomerAndCompany(String customerId, String companyId) {

		return crepo.findByCustomerIdAndCompanyId(customerId, companyId);
	}

	@Override
	public Claim addClaim(Claim claim) throws ClaimIdAlreadyExistsException {

		Optional<Claim> optc = crepo.findById(claim.getClaimId());
		
		if(optc.isEmpty()) {
			if(claim.getDocuments()==null) {
				claim.setDocuments(new ArrayList<ClaimDocument>());
			}
			claim.setDate_created(LocalDate.now());
			return crepo.save(claim);
		}else {
			throw new ClaimIdAlreadyExistsException();
		}
		
	}

	@Override
	public boolean addDocumentToClaim(String claimId, ClaimDocument claimDoc) throws ClaimNotFoundException, DocumentIdAlreadyExistsException {
		Optional<Claim> optc = crepo.findById(claimId);
		
		if(optc.isEmpty()) {
			throw new ClaimNotFoundException(); 
		}else {
			Claim claim = optc.get();
			List<ClaimDocument> existingDocs = claim.getDocuments();
			
			Optional<ClaimDocument> docRes = existingDocs.stream().filter(d -> d.getDocumentId().equals(claimDoc.getDocumentId())).findFirst();
		
			if(docRes.isPresent()) {
				throw new DocumentIdAlreadyExistsException();
			}else {
				claimDoc.setDate(LocalDate.now());
				existingDocs.add(claimDoc);
				claim.setDocuments(existingDocs);
				crepo.save(claim);
				return true;
			}
		}
	}

	@Override
	public boolean deleteDocumentFromClaim(String claimId, String docId) throws ClaimNotFoundException{
		Optional<Claim> optc = crepo.findById(claimId);
		
		if(optc.isEmpty()) {
			throw new ClaimNotFoundException();
		}else {
			Claim claim = optc.get();
			List<ClaimDocument> existingDocs = claim.getDocuments();
			existingDocs.removeIf((doc) -> doc.getDocumentId().equals(docId));
			claim.setDocuments(existingDocs);
			crepo.save(claim);
			return true;
		}
	}

	@Override
	public Claim updateClaimNotes(String claimId, String notes) throws ClaimNotFoundException {
		Optional<Claim> optc = crepo.findById(claimId);
		
		if(optc.isEmpty()) {
			throw new ClaimNotFoundException();
		}else {
			Claim claim = optc.get();
			claim.setNotes(notes);
			crepo.save(claim);
			return claim;
		}
	}

	@Override
	public Claim updateClaimDescription(String claimId, String desc) throws ClaimNotFoundException {
		Optional<Claim> optc = crepo.findById(claimId);
		
		if(optc.isEmpty()) {
			throw new ClaimNotFoundException();
		}else {
			Claim claim = optc.get();
			claim.setDescription(desc);
			crepo.save(claim);
			return claim;
		}
	}

	@Override
	public Claim updateClaimApproval(String claimId, boolean isApproved) throws ClaimNotFoundException {
		Optional<Claim> optc = crepo.findById(claimId);
		
		if(optc.isEmpty()) {
			throw new ClaimNotFoundException();
		}else {
			Claim claim = optc.get();
			claim.setIsApproved(isApproved);
			crepo.save(claim);
			return claim;
		}
	}

	@Override
	public Claim updateClaimActive(String claimId, boolean isActive) throws ClaimNotFoundException {
		Optional<Claim> optc = crepo.findById(claimId);
		
		if(optc.isEmpty()) {
			throw new ClaimNotFoundException();
		}else {
			Claim claim = optc.get();
			claim.setIsActive(isActive);
			crepo.save(claim);
			return claim;
		}
	}

	@Override
	public boolean deleteClaim(String claimId) throws ClaimNotFoundException {
		Optional<Claim> optc = crepo.findById(claimId);
		
		if(optc.isEmpty()) {
			throw new ClaimNotFoundException();
		}else {
			crepo.deleteById(claimId);
			return true;
		}
	}

	@Override
	public List<Claim> getApprovedClaims(boolean isApproved) {
		
		return crepo.findByIsApproved(isApproved);
	}

	@Override
	public List<Claim> getApprovedClaimsByCompany(boolean isApproved, String companyId) {
	
		return crepo.findByIsApprovedAndCompanyId(isApproved, companyId);
	}

}
