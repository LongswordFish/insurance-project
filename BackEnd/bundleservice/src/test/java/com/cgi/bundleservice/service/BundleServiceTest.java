package com.cgi.bundleservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.cgi.bundleservice.exception.BundleNotFoundException;
import com.cgi.bundleservice.model.Bundle;
import com.cgi.bundleservice.repo.BundleRepository;

public class BundleServiceTest {

	@InjectMocks
	private BundleServiceImpl bundleService;

	@Mock
	private BundleRepository bundleRepository;

	@BeforeEach
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testGetAllBundles() {
		// Test that the service can retrieve all bundles from the repository
		List<Bundle> expectedBundles = new ArrayList<>();
		expectedBundles.add(new Bundle("123", "Sunlife", List.of("1", "2", "3"), 50.0, "location1", "company1"));
		expectedBundles.add(new Bundle("456", "Sunlife", List.of("4", "5", "6"), 100.0, "location2", "company2"));
		when(bundleRepository.findAll()).thenReturn(expectedBundles);

		List<Bundle> actualBundles = bundleService.getAllBundles();

		assertEquals(expectedBundles.size(), actualBundles.size());
		assertEquals(expectedBundles.get(0).getBundleid(), actualBundles.get(0).getBundleid());
		assertEquals(expectedBundles.get(0).getBundlename(), actualBundles.get(0).getBundlename());
		assertEquals(expectedBundles.get(0).getProductids(), actualBundles.get(0).getProductids());
		assertEquals(expectedBundles.get(0).getTotalPrice(), actualBundles.get(0).getTotalPrice());
		assertEquals(expectedBundles.get(0).getLocation(), actualBundles.get(0).getLocation());
		assertEquals(expectedBundles.get(0).getCompanyid(), actualBundles.get(0).getCompanyid());
		assertEquals(expectedBundles.get(1).getBundleid(), actualBundles.get(1).getBundleid());
		assertEquals(expectedBundles.get(1).getBundlename(), actualBundles.get(1).getBundlename());
		assertEquals(expectedBundles.get(1).getProductids(), actualBundles.get(1).getProductids());
		assertEquals(expectedBundles.get(1).getTotalPrice(), actualBundles.get(1).getTotalPrice());
		assertEquals(expectedBundles.get(1).getLocation(), actualBundles.get(1).getLocation());
		assertEquals(expectedBundles.get(1).getCompanyid(), actualBundles.get(1).getCompanyid());
	}

	
	@Test
	public void testCreateBundle() throws BundleNotFoundException {
		// Test that the service can create a new bundle and save it in the repository
		Bundle bundle = new Bundle("123", "Sunlife", List.of("1", "2", "3"), 50.0, "location1", "company1");
		when(bundleRepository.save(bundle)).thenReturn(bundle);

		Bundle createdBundle = bundleService.createBundle(bundle);

		assertEquals(bundle.getBundleid(), createdBundle.getBundleid());
		assertEquals(bundle.getBundlename(), createdBundle.getBundlename());
		assertEquals(bundle.getProductids(), createdBundle.getProductids());
		assertEquals(bundle.getTotalPrice(), createdBundle.getTotalPrice());
		assertEquals(bundle.getLocation(), createdBundle.getLocation());
		assertEquals(bundle.getCompanyid(), createdBundle.getCompanyid());
	}
	
	@Test
	public void testGetBundleById() throws BundleNotFoundException {
	    // Test that the service can retrieve a bundle by its ID
	    String bundleId = "123";
	    Bundle bundle = new Bundle(bundleId, "Sunlife", List.of("1", "2", "3"), 50.0, "location1", "company1");
	    when(bundleRepository.findById(bundleId)).thenReturn(Optional.of(bundle));

	    Bundle retrievedBundle = bundleService.getBundleById(bundleId);

	    assertAll("Bundle retrieval",
	            () -> assertEquals(bundle.getBundleid(), retrievedBundle.getBundleid()),
	            () -> assertEquals(bundle.getBundlename(), retrievedBundle.getBundlename()),
	            () -> assertEquals(bundle.getProductids(), retrievedBundle.getProductids()),
	            () -> assertEquals(bundle.getTotalPrice(), retrievedBundle.getTotalPrice()),
	            () -> assertEquals(bundle.getLocation(), retrievedBundle.getLocation()),
	            () -> assertEquals(bundle.getCompanyid(), retrievedBundle.getCompanyid()));
	}
	
	@Test
	public void testViewBundleByCompanyId() throws BundleNotFoundException {
	    // Test that the service can retrieve a bundle by company ID and bundle ID
	    String companyId = "company1";
	    String id = "123";
	    Bundle bundle = new Bundle(id, "Sunlife", List.of("1", "2", "3"), 50.0, "location1", companyId);
	    when(bundleRepository.findByCompanyidAndBundleid(companyId, id)).thenReturn(Optional.of(bundle));

	    Bundle retrievedBundle = bundleService.viewBundleByCompanyId(companyId, id);

	    assertAll("Bundle retrieval",
	            () -> assertEquals(bundle.getBundleid(), retrievedBundle.getBundleid()),
	            () -> assertEquals(bundle.getBundlename(), retrievedBundle.getBundlename()),
	            () -> assertEquals(bundle.getProductids(), retrievedBundle.getProductids()),
	            () -> assertEquals(bundle.getTotalPrice(), retrievedBundle.getTotalPrice()),
	            () -> assertEquals(bundle.getLocation(), retrievedBundle.getLocation()),
	            () -> assertEquals(bundle.getCompanyid(), retrievedBundle.getCompanyid()));
	}

	@Test
	public void testViewBundleByCompanyIdWithInvalidCompanyId() throws BundleNotFoundException {
	    // Test that the service throws an exception when the bundle is not associated with the given company ID
	    String companyId = "123";
	    String bundleId = "456";
	    Bundle bundle = new Bundle(bundleId, "Sunlife", Arrays.asList("P1", "P2"), 100.0, "Location1", "differentCompanyId");
	    when(bundleRepository.findByCompanyidAndBundleid(companyId, bundleId)).thenReturn(Optional.of(bundle));

	    assertThrows(BundleNotFoundException.class, () -> {
	        bundleService.viewBundleByCompanyId(companyId, bundleId);
	    });
	}

	
	@Test
	public void testDeleteBundle() throws BundleNotFoundException {
	    // Test that the service can delete an existing bundle
	    String bundleId = "123";
	    Bundle bundle = new Bundle(bundleId, "Sunlife", List.of("1", "2", "3"), 50.0, "location1", "company1");
	    when(bundleRepository.findById(bundleId)).thenReturn(Optional.of(bundle));
	    bundleService.deleteBundle(bundleId);
	    
	    // Ensure that the repository method was called with the correct ID
	    verify(bundleRepository).deleteById(bundleId);
	}
}
