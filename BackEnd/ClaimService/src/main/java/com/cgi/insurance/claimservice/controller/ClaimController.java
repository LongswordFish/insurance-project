package com.cgi.insurance.claimservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cgi.insurance.claimservice.service.*;
import com.cgi.insurance.claimservice.exception.ClaimIdAlreadyExistsException;
import com.cgi.insurance.claimservice.exception.ClaimNotFoundException;
import com.cgi.insurance.claimservice.exception.DocumentIdAlreadyExistsException;
import com.cgi.insurance.claimservice.model.*;

@RestController
@CrossOrigin
@RequestMapping("/claim")
public class ClaimController {

	ClaimService cservice;
	
	@Autowired
	public ClaimController(ClaimService cservice) {
		this.cservice = cservice;
	}
	
	@GetMapping("/view")
	public ResponseEntity<?> getAllClaims(){
		List<Claim> claims = cservice.getAllClaims();
		
		return new ResponseEntity<List<Claim>>(claims, HttpStatus.OK);
	}
	
	@GetMapping("/view/{claimId}")
	public ResponseEntity<?> getClaimsById(@PathVariable ("claimId") String claimId){
		Claim claim;
		try {
			claim = cservice.getClaimById(claimId);
			return new ResponseEntity<Claim>(claim, HttpStatus.OK);
		} catch (ClaimNotFoundException e) {
			return new ResponseEntity<String>("Claim not found", HttpStatus.NOT_FOUND );
		}
		
		
	}
	
	@GetMapping("/view/customer/{customerId}")
	public ResponseEntity<?> getClaimsByCustomerId(@PathVariable ("customerId") String customerId){
		List<Claim> claims = cservice.getClaimsByCustomer(customerId);
		
		return new ResponseEntity<List<Claim>>(claims, HttpStatus.OK);
	}
	
	@GetMapping("/view/company/{companyId}")
	public ResponseEntity<?> getClaimsBycompanyId(@PathVariable ("companyId") String companyId){
		List<Claim> claims = cservice.getClaimsByCompany(companyId);
		
		return new ResponseEntity<List<Claim>>(claims, HttpStatus.OK);
	}
	
	@GetMapping("/view/{companyId}/{customerId}")
	public ResponseEntity<?> getClaimsByCompanyAndCustomerId(@PathVariable ("companyId") String companyId, @PathVariable ("customerId") String customerId){
		List<Claim> claims = cservice.getClaimsByCustomerAndCompany(customerId,companyId);
		
		return new ResponseEntity<List<Claim>>(claims, HttpStatus.OK);
	}
	
	@GetMapping("/view/isApproved/{isApproved}")
	public ResponseEntity<?> getClaimsByApproval(@PathVariable ("isApproved") String isApproved){
		
		if(isApproved.equalsIgnoreCase("true")||isApproved.equalsIgnoreCase("false")) {
			isApproved = isApproved.toLowerCase();
			boolean boolIsApproved = Boolean.parseBoolean(isApproved);
			 
			List<Claim> claims = cservice.getApprovedClaims(boolIsApproved);
			return new ResponseEntity<List<Claim>>(claims, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Please query with true or false", HttpStatus.NOT_ACCEPTABLE );
		}
		
	}
	
	@GetMapping("/view/isApproved/{companyId}/{isApproved}")
	public ResponseEntity<?> getClaimsByComapnyAndApproval(@PathVariable ("companyId") String companyId, @PathVariable ("isApproved") String isApproved){
		
		if(isApproved.equalsIgnoreCase("true")||isApproved.equalsIgnoreCase("false")) {
			isApproved = isApproved.toLowerCase();
			boolean boolIsApproved = Boolean.parseBoolean(isApproved);
			 
			List<Claim> claims = cservice.getApprovedClaimsByCompany(boolIsApproved, companyId);
			return new ResponseEntity<List<Claim>>(claims, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Please query with true or false", HttpStatus.NOT_ACCEPTABLE );
		}
		
	}
	
	@PostMapping("/add")
	public ResponseEntity<?> addClaim(@RequestBody Claim c){
		try {
			Claim createdClaim = cservice.addClaim(c);
			return new ResponseEntity<Claim>(createdClaim, HttpStatus.CREATED);
		} catch (ClaimIdAlreadyExistsException e) {
			return new ResponseEntity<String>("Claim id already exsits", HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/document/add/{claimId}")
	public ResponseEntity<?> addDocumentToClaim(@PathVariable ("claimId") String claimId, @RequestBody ClaimDocument claimDoc){
		try {
			boolean created = cservice.addDocumentToClaim(claimId, claimDoc);
			if(created) {
				return new ResponseEntity<String>("Sucessfully Added to " + claimId, HttpStatus.CREATED );
			}else {
				return new ResponseEntity<String>("Error Adding", HttpStatus.CONFLICT);
			}
			
		} catch (ClaimNotFoundException e) {
			return new ResponseEntity<String>("Claim not found", HttpStatus.NOT_FOUND);
		} catch (DocumentIdAlreadyExistsException e) {
			return new ResponseEntity<String>("Document ID Already Exists", HttpStatus.CONFLICT);
		}
	}
	
	@DeleteMapping("/document/delete/{claimId}/{documentId}")
	public ResponseEntity<?> deleteDocumentFromClaim(@PathVariable ("claimId") String claimId, @PathVariable ("documentId") String documentId){
		try {
			boolean deleted = cservice.deleteDocumentFromClaim(claimId, documentId);
			if(deleted) {
				return new ResponseEntity<String>("Sucessfully Deleted Document "+ documentId + " from " + claimId , HttpStatus.OK );
			}else {
				return new ResponseEntity<String>("Error Deleting", HttpStatus.NOT_FOUND );
			}
			
		} catch (ClaimNotFoundException e) {
			return new ResponseEntity<String>("Claim not found", HttpStatus.NOT_FOUND );
		}
	}
	
	@PostMapping("/update/notes/{claimId}")
	public ResponseEntity<?> updateClaimNotes(@PathVariable ("claimId") String claimId, @RequestBody String notes){
		
		try {
			Claim updatedClaim = cservice.updateClaimNotes(claimId, notes);
			return new ResponseEntity<Claim>(updatedClaim, HttpStatus.OK);
		} catch (ClaimNotFoundException e) {
			return new ResponseEntity<String>("Claim not found", HttpStatus.NOT_FOUND );
		}
	}
	
	@PostMapping("/update/description/{claimId}")
	public ResponseEntity<?> updateClaimDesc(@PathVariable ("claimId") String claimId, @RequestBody String desc){
		
		try {
			Claim updatedClaim = cservice.updateClaimDescription(claimId, desc);
			return new ResponseEntity<Claim>(updatedClaim, HttpStatus.OK);
		} catch (ClaimNotFoundException e) {
			return new ResponseEntity<String>("Claim not found", HttpStatus.NOT_FOUND );
		}
	}
	
	@PostMapping("/approve/{claimId}/{isApproved}")
	public ResponseEntity<?> updateClaimApproval(@PathVariable ("claimId") String claimId, @PathVariable ("isApproved") String isApproved ){
		
		if(isApproved.equalsIgnoreCase("true")||isApproved.equalsIgnoreCase("false")) {
			isApproved = isApproved.toLowerCase();
			boolean boolIsApproved = Boolean.parseBoolean(isApproved);
			
			try {
				Claim updatedClaim = cservice.updateClaimApproval(claimId, boolIsApproved);
				return new ResponseEntity<Claim>(updatedClaim, HttpStatus.OK);
			} catch (ClaimNotFoundException e) {
				return new ResponseEntity<String>("Claim not found", HttpStatus.NOT_FOUND );
			}
		}else {
			return new ResponseEntity<String>("Please update with true or false", HttpStatus.NOT_ACCEPTABLE );
		}
		
	}
	
	@PostMapping("/active/{claimId}/{isActive}")
	public ResponseEntity<?> updateClaimActive(@PathVariable ("claimId") String claimId, @PathVariable ("isActive") String isActive ){
		
		if(isActive.equalsIgnoreCase("true")||isActive.equalsIgnoreCase("false")) {
			isActive = isActive.toLowerCase();
			boolean boolIsActive = Boolean.parseBoolean(isActive);
			
			try {
				Claim updatedClaim = cservice.updateClaimActive(claimId, boolIsActive);
				return new ResponseEntity<Claim>(updatedClaim, HttpStatus.OK);
			} catch (ClaimNotFoundException e) {
				return new ResponseEntity<String>("Claim not found", HttpStatus.NOT_FOUND );
			}
		}else {
			return new ResponseEntity<String>("Please update with true or false", HttpStatus.NOT_ACCEPTABLE );
		}
		
	}
	
	@DeleteMapping("/delete/{claimId}")
	public ResponseEntity<?> deleteClaim(@PathVariable ("claimId") String claimId){
		
		try {
			boolean isDeleted = cservice.deleteClaim(claimId);
			
			if(isDeleted) {
				return new ResponseEntity<String>("Sucessfully Deleted " + claimId, HttpStatus.OK );
			}else {
				return new ResponseEntity<String>("Error Deleting", HttpStatus.NOT_FOUND );
			}
			
		} catch (ClaimNotFoundException e) {
			return new ResponseEntity<String>("Claim not found", HttpStatus.NOT_FOUND );
		}
	}
	
}
