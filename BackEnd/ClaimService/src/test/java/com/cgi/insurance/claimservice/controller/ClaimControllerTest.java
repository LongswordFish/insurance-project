package com.cgi.insurance.claimservice.controller;

import com.cgi.insurance.claimservice.exception.ClaimIdAlreadyExistsException;
import com.cgi.insurance.claimservice.exception.ClaimNotFoundException;
import com.cgi.insurance.claimservice.exception.DocumentIdAlreadyExistsException;
import com.cgi.insurance.claimservice.model.Claim;
import com.cgi.insurance.claimservice.model.ClaimDocument;
import com.cgi.insurance.claimservice.service.ClaimService;
import com.cgi.insurance.claimservice.service.ClaimServiceImpl;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

class ClaimControllerTest {

    @Mock
    private ClaimService claimService;

    @InjectMocks
    private ClaimController claimController;
    
    private ClaimServiceImpl cservice;
	private Claim claimTest;
	private ClaimDocument claimDocTest;
	private List<ClaimDocument> claimDocList = new ArrayList<ClaimDocument>();

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
        
        claimDocTest = new ClaimDocument("doc1", "test.url", "info123");
		claimDocList.add(claimDocTest);
		
		claimTest = new Claim("customer1", "product1", "company1",
				true, "description123", "notes123", claimDocList);
		
		claimTest.setClaimId("1");
        
    }

    @Test
    void testGetAllClaims() {
        List<Claim> claims = new ArrayList<>();
        claims.add(claimTest);
        when(claimService.getAllClaims()).thenReturn(claims);
        ResponseEntity<?> responseEntity = claimController.getAllClaims();
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(claims, responseEntity.getBody());
    }

    @Test
    void testGetClaimsByIdSuccess() throws ClaimNotFoundException {
        Claim claim = claimTest;
        when(claimService.getClaimById("1")).thenReturn(claim);
        ResponseEntity<?> responseEntity = claimController.getClaimsById("1");
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(claim, responseEntity.getBody());
    }

    @Test
    void testGetClaimsByIdFailure() throws ClaimNotFoundException {
        when(claimService.getClaimById("1")).thenThrow(new ClaimNotFoundException());
        ResponseEntity<?> responseEntity = claimController.getClaimsById("1");
        Assertions.assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        Assertions.assertEquals("Claim not found", responseEntity.getBody());
    }

    @Test
    void testGetClaimsByCustomerId() {
        List<Claim> claims = new ArrayList<>();
        claims.add(claimTest);
        when(claimService.getClaimsByCustomer("customer1")).thenReturn(claims);
        ResponseEntity<?> responseEntity = claimController.getClaimsByCustomerId("customer1");
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(claims, responseEntity.getBody());
    }

    @Test
    void testGetClaimsByCompanyId() {
        List<Claim> claims = new ArrayList<>();
        claims.add(claimTest);
        when(claimService.getClaimsByCompany("company1")).thenReturn(claims);
        ResponseEntity<?> responseEntity = claimController.getClaimsBycompanyId("company1");
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(claims, responseEntity.getBody());
    }
    
    @Test
    void testGetClaimsByCompanyAndCustomer() {
        List<Claim> claims = new ArrayList<>();
        claims.add(claimTest);
        when(claimService.getClaimsByCustomerAndCompany("customer1","company1")).thenReturn(claims);
        ResponseEntity<?> responseEntity = claimController.getClaimsByCompanyAndCustomerId("company1","customer1");
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(claims, responseEntity.getBody());
    }
    
    @Test
    void testGetClaimsByApproval() {
        List<Claim> claims = new ArrayList<>();
        claims.add(claimTest);
        when(claimService.getApprovedClaims(true)).thenReturn(claims);
        ResponseEntity<?> responseEntity = claimController.getClaimsByApproval("true");
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(claims, responseEntity.getBody());
    }
    
    @Test
    void testGetClaimsByApprovalFailure() {
        ResponseEntity<?> responseEntity = claimController.getClaimsByApproval("wrong_input");
        Assertions.assertEquals(HttpStatus.NOT_ACCEPTABLE, responseEntity.getStatusCode());
        Assertions.assertEquals("Please query with true or false", responseEntity.getBody());
    }
    
    @Test
    void getClaimsByComapnyAndApproval() {
        List<Claim> claims = new ArrayList<>();
        claims.add(claimTest);
        when(claimService.getApprovedClaimsByCompany(true,"company1")).thenReturn(claims);
        ResponseEntity<?> responseEntity = claimController.getClaimsByComapnyAndApproval("company1","true");
        Assertions.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assertions.assertEquals(claims, responseEntity.getBody());
    }
    
    @Test
    void getClaimsByComapnyAndApprovalFailure() {
        ResponseEntity<?> responseEntity = claimController.getClaimsByComapnyAndApproval("company1","wrong_input");
        Assertions.assertEquals(HttpStatus.NOT_ACCEPTABLE, responseEntity.getStatusCode());
        Assertions.assertEquals("Please query with true or false", responseEntity.getBody());
    }
    
}



