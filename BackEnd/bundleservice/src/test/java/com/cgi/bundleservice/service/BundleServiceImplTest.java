package com.cgi.bundleservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.cgi.bundleservice.exception.BundleNotFoundException;
import com.cgi.bundleservice.model.Bundle;
import com.cgi.bundleservice.repo.BundleRepository;

@SpringBootTest
@ActiveProfiles("test")
public class BundleServiceImplTest {

    @InjectMocks
    private BundleServiceImpl bundleService;

    @Mock
    private BundleRepository bundleRepository;

    @Test
    public void testCreateBundle() {
        // Test that the service can create a bundle
        Bundle bundle = new Bundle("1", Arrays.asList("P1", "P2"), 100.0, "Location1", "C1");
        when(bundleRepository.save(bundle)).thenReturn(bundle);

        Bundle createdBundle = bundleService.createBundle(bundle);

        assertEquals(bundle.getBundleid(), createdBundle.getBundleid());
        assertEquals(bundle.getProductids(), createdBundle.getProductids());
        assertEquals(bundle.getTotalPrice(), createdBundle.getTotalPrice());
        assertEquals(bundle.getLocation(), createdBundle.getLocation());
        assertEquals(bundle.getCompanyid(), createdBundle.getCompanyid());
    }

    @Test
    public void testGetBundleById() throws BundleNotFoundException {
        // Test that the service can retrieve an existing bundle by its ID
        String bundleId = "123";
        Bundle bundle = new Bundle(bundleId, Arrays.asList("P1", "P2"), 100.0, "Location1", "C1");
        when(bundleRepository.findById(bundleId)).thenReturn(Optional.of(bundle));

        Bundle resultBundle = bundleService.getBundleById(bundleId);

        assertEquals(bundle.getBundleid(), resultBundle.getBundleid());
        assertEquals(bundle.getProductids(), resultBundle.getProductids());
        assertEquals(bundle.getTotalPrice(), resultBundle.getTotalPrice());
        assertEquals(bundle.getLocation(), resultBundle.getLocation());
        assertEquals(bundle.getCompanyid(), resultBundle.getCompanyid());
    }

    @Test
    public void testUpdateBundle() throws BundleNotFoundException {
        // Test that the service can update an existing bundle
        String bundleId = "123";
        Bundle originalBundle = new Bundle(bundleId, List.of("1", "2", "3"), 50.0, "location1", "company1");
        when(bundleRepository.findById(bundleId)).thenReturn(Optional.of(originalBundle));
        Bundle updatedBundle = new Bundle(bundleId, List.of("4", "5"), 30.0, "location2", "company2");
        when(bundleRepository.save(any())).thenReturn(updatedBundle);

        Bundle resultBundle = bundleService.updateBundle(bundleId, updatedBundle);

        assertEquals(resultBundle.getBundleid(), updatedBundle.getBundleid());
        assertEquals(resultBundle.getProductids(), updatedBundle.getProductids());
        assertEquals(resultBundle.getTotalPrice(), updatedBundle.getTotalPrice());
        assertEquals(resultBundle.getLocation(), updatedBundle.getLocation());
        assertEquals(resultBundle.getCompanyid(), updatedBundle.getCompanyid());
    }

    @Test
    public void testDeleteBundleById() throws BundleNotFoundException {
        // Test that the service can delete an existing bundle by its ID
        String bundleId = "123";
        Bundle bundle = new Bundle(bundleId, Arrays.asList("P1", "P2"), 100.0, "Location1", "C1");
        when(bundleRepository.findById(bundleId)).thenReturn(Optional.of(bundle));
        bundleService.deleteBundle(bundleId);
    }
}