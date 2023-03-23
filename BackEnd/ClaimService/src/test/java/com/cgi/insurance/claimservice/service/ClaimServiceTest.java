package com.cgi.insurance.claimservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.cgi.insurance.claimservice.exception.*;
import com.cgi.insurance.claimservice.model.*;
import com.cgi.insurance.claimservice.service.*;
import com.cgi.insurance.claimservice.repository.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class ClaimServiceTest {
	
	@Mock
	private ClaimRepository crepo;
	
	@InjectMocks
	private ClaimServiceImpl cservice;
	private Claim claimTest;
	private ClaimDocument claimDocTest;
	private List<Claim> claimList = new ArrayList<Claim>();
	private List<ClaimDocument> claimDocList = new ArrayList<ClaimDocument>();
	private Optional optc;
	
	@BeforeEach
	public void setUp() {
		MockitoAnnotations.initMocks(this);

		claimDocTest = new ClaimDocument("doc1", "test.url", "info123");
		claimDocList.add(claimDocTest);
		
		claimTest = new Claim("customer1", "product1", "company1",
				true, "description123", "notes123", claimDocList);
		
		claimTest.setClaimId("claim1");
		
		claimList.add(claimTest);
	    optc = Optional.of(claimTest);
	}
	
	@AfterEach
    public void tearDown() {
		claimTest = null;
		claimList = null;
		
    }
	
	@Test
	public void testGetAllClaimsReturnsClaims() {
		when(crepo.findAll()).thenReturn(claimList);

		List<Claim> actualClaims = cservice.getAllClaims();

		assertEquals(claimList, actualClaims);
	}
	
	@Test
	public void testGetClaimByIdReturnsClaim() throws ClaimNotFoundException {
		String claimId = "claim1";
		Optional<Claim> optionalClaim = Optional.of(claimTest);
		when(crepo.findById(claimId)).thenReturn(optionalClaim);
		
		Claim actualClaim = cservice.getClaimById(claimId);

		assertEquals(claimTest, actualClaim);
	}

	@Test
	public void testGetClaimsByCustomerReturnsClaims() {
		String customerId = "customer1";
		when(crepo.findByCustomerId(customerId)).thenReturn(claimList);

		List<Claim> actualClaims = cservice.getClaimsByCustomer(customerId);

		assertEquals(claimList, actualClaims);
	}
	
	@Test
	public void testGetClaimsByCompanyReturnsClaims() {
		String compandId = "company1";
		when(crepo.findByCustomerId(compandId)).thenReturn(claimList);

		List<Claim> actualClaims = cservice.getClaimsByCustomer(compandId);

		assertEquals(claimList, actualClaims);
	}
	
	@Test
	public void testGetClaimsByCompanyAndClientReturnsClaims() {
		String compandId = "company1";
		String customerId = "customer1";
		when(crepo.findByCustomerIdAndCompanyId(customerId, compandId)).thenReturn(claimList);

		List<Claim> actualClaims = cservice.getClaimsByCustomerAndCompany(customerId, compandId);

		assertEquals(claimList, actualClaims);
	}
	
	@Test
	public void testAddClaimReturnsAddedClaim() throws ClaimIdAlreadyExistsException {
		when(crepo.save(any())).thenReturn(claimTest);
		assertEquals(claimTest, cservice.addClaim(claimTest));
		verify(crepo, times(1)).save(any());
	}
	
	@Test
    void testDeleteClaimReturnTrue() throws ClaimNotFoundException {
        when(crepo.findById(claimTest.getClaimId())).thenReturn(optc);
        cservice.deleteClaim("claim1");


        verify(crepo, times(1)).findById(claimTest.getClaimId());
        verify(crepo, times(1)).deleteById(claimTest.getClaimId());
    }

	
	
	
	



}
