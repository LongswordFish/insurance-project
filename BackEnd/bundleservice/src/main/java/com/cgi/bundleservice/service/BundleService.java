package com.cgi.bundleservice.service;

import java.util.List;

import com.cgi.bundleservice.exception.BundleNotFoundException;
import com.cgi.bundleservice.model.Bundle;



public interface BundleService {
    
    List<Bundle> getAllBundles();
    
    Bundle createBundle(Bundle bundle);
    Bundle getBundleById(String bundleId) throws BundleNotFoundException;
    Bundle updateBundle(String bundleId, Bundle bundle) throws BundleNotFoundException;
    void deleteBundle(String bundleId) throws BundleNotFoundException;
        
}