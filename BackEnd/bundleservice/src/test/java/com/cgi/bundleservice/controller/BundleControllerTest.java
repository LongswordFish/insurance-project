package com.cgi.bundleservice.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cgi.bundleservice.model.Bundle;
import com.cgi.bundleservice.service.BundleService;

@ExtendWith(MockitoExtension.class)
public class BundleControllerTest {
    
    @Mock
    private BundleService bundleService;
    
    @InjectMocks
    private BundleController bundleController;
    
    private List<Bundle> expectedBundles;
    
    @BeforeEach
    public void setUp() {
        Bundle bundle1 = new Bundle("123", List.of("1", "2", "3"), 50.0, "location1", "company1");
        expectedBundles = Collections.singletonList(bundle1);
        when(bundleService.getAllBundles()).thenReturn(expectedBundles);
    }
    
    @Test
    public void testGetAllBundles() {
        List<Bundle> actualBundles = bundleController.getAllBundles();
        assertEquals(expectedBundles, actualBundles);
    }
}
