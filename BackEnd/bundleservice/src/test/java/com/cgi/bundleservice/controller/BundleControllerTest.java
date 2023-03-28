package com.cgi.bundleservice.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.hamcrest.Matchers.hasSize;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.cgi.bundleservice.model.Bundle;
import com.cgi.bundleservice.service.BundleService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class BundleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private BundleService bundleService;

    @Autowired
    private BundleController bundleController;

    private static final String BUNDLE_ID = "bundle-001";
    private static final String BUNDLE_NAME = "Test Bundle";
    private static final List<String> PRODUCT_IDS = Arrays.asList("product-001", "product-002");
    private static final Double TOTAL_PRICE = 100.0;
    private static final String LOCATION = "Test Location";
    private static final String COMPANY_ID = "company-001";

    private Bundle createTestBundle() {
        Bundle bundle = new Bundle("1", "Sunlife", Arrays.asList("product-001", "product-002"), 100.0, "Test Location", "company-001");
        bundle.setBundleid(BUNDLE_ID);
        bundle.setBundlename(BUNDLE_NAME);
        bundle.setProductids(PRODUCT_IDS);
        bundle.setTotalPrice(TOTAL_PRICE);
        bundle.setLocation(LOCATION);
        bundle.setCompanyid(COMPANY_ID);
        return bundle;
    }


    @Test
    public void testGetAllBundles() throws Exception {
        List<Bundle> bundles = Arrays.asList(createTestBundle());

        when(bundleService.getAllBundles()).thenReturn(bundles);

        mockMvc.perform(get("/bundles"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetBundleById() throws Exception {
        Bundle bundle = createTestBundle();

        when(bundleService.getBundleById(BUNDLE_ID)).thenReturn(bundle);

        mockMvc.perform(get("/bundles/view/{id}", BUNDLE_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.bundleid", is(BUNDLE_ID)))
                .andExpect(jsonPath("$.bundlename", is(BUNDLE_NAME)))
                .andExpect(jsonPath("$.productids", hasSize(2)))
                .andExpect(jsonPath("$.totalPrice", is(TOTAL_PRICE)))
                .andExpect(jsonPath("$.location", is(LOCATION)))
                .andExpect(jsonPath("$.companyid", is(COMPANY_ID)));
    }
    
    @Test
    public void testCreateBundle() throws Exception {
        Bundle bundle = createTestBundle();
        
        when(bundleService.createBundle(any(Bundle.class))).thenReturn(bundle);
        
        mockMvc.perform(post("/bundles/create")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(bundle)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.bundleid", is(BUNDLE_ID)))
            .andExpect(jsonPath("$.bundlename", is(BUNDLE_NAME)))
            .andExpect(jsonPath("$.productids", hasSize(2)))
            .andExpect(jsonPath("$.totalPrice", is(TOTAL_PRICE)))
            .andExpect(jsonPath("$.location", is(LOCATION)))
            .andExpect(jsonPath("$.companyid", is(COMPANY_ID)));
    }

    @Test
    public void testUpdateBundle() throws Exception {
        String updatedName = "Updated Bundle";
        List<String> updatedProductIds = Arrays.asList("product-003", "product-004");
        Double updatedTotalPrice = 200.0;
        String updatedLocation = "Updated Location";
        String updatedCompanyId = "company-002";

        Bundle updatedBundle = new Bundle("1", "Sunlife", Arrays.asList("product-001", "product-002"), 100.0, "Test Location", "company-001");
        updatedBundle.setBundleid(BUNDLE_ID);
        updatedBundle.setBundlename(updatedName);
        updatedBundle.setProductids(updatedProductIds);
        updatedBundle.setTotalPrice(updatedTotalPrice);
        updatedBundle.setLocation(updatedLocation);
        updatedBundle.setCompanyid(updatedCompanyId);

        when(bundleService.updateBundle(eq(BUNDLE_ID), any(Bundle.class))).thenReturn(updatedBundle);

        mockMvc.perform(put("/bundles/update/{id}", BUNDLE_ID)
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(updatedBundle)))
                .andExpect(status().isOk());
//                .andExpect(jsonPath("$.bundleid", is(BUNDLE_ID)))
//                .andExpect(jsonPath("$.bundlename", is(updatedName)))
//                .andExpect(jsonPath("$.productids", hasSize(2)))
//                .andExpect(jsonPath("$.totalPrice", is(updatedTotalPrice)))
//                .andExpect(jsonPath("$.location", is(updatedLocation)))
//                .andExpect(jsonPath("$.companyid", is(updatedCompanyId)));
    }
    
    @Test
    public void testDeleteBundle() throws Exception {
        String bundleId = "bundle-001";
        doNothing().when(bundleService).deleteBundle(bundleId);

        mockMvc.perform(delete("/bundles/delete/{id}", bundleId))
            .andExpect(status().isOk());
    }


    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}