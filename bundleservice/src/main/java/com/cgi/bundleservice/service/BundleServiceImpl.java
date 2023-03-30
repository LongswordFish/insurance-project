package com.cgi.bundleservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cgi.bundleservice.exception.BundleNotFoundException;
import com.cgi.bundleservice.model.Bundle;
import com.cgi.bundleservice.repo.BundleRepository;

@Service
public class BundleServiceImpl implements BundleService {
    
    @Autowired
    BundleRepository bundleRepository;

    @Override
    public List<Bundle> getAllBundles() {
        return bundleRepository.findAll();
    }
    
    @Override
    public Bundle createBundle(Bundle bundle) {
        return bundleRepository.save(bundle);
    }

    @Override
    public Bundle getBundleById(String id) throws BundleNotFoundException {
        Optional<Bundle> optional = bundleRepository.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new BundleNotFoundException("Bundle with ID " + id + " not found.");
        }
    }
    
//    public Bundle getBundleByName(String bundlename) throws BundleNotFoundException {
//        Optional<Bundle> optional = bundleRepository.findById(bundlename);
//        if (optional.isPresent()) {
//            return optional.get();
//        } else {
//            throw new BundleNotFoundException("Bundle with Name " + bundlename + " not found.");
//        }
//    }
    
    @Override
    public Bundle viewBundleByCompanyId(String companyId, String id) throws BundleNotFoundException {
        Optional<Bundle> optionalBundle = bundleRepository.findByCompanyidAndBundleid(companyId, id);
        if (optionalBundle.isPresent()) {
            Bundle bundle = optionalBundle.get();
            if (bundle.getCompanyid().equals(companyId)) {
                return bundle;
            } else {
                throw new BundleNotFoundException("Bundle with ID " + id + " is not associated with company with ID " + companyId);
            }
        } else {
            throw new BundleNotFoundException("Bundle with ID " + id + " not found.");
        }
    }


    @Override
    public Bundle updateBundle(String id, Bundle bundle) throws BundleNotFoundException {
        Optional<Bundle> optional = bundleRepository.findById(id);
        if (optional.isPresent()) {
            Bundle existingBundle = optional.get();
            existingBundle.setLocation(bundle.getLocation());
            existingBundle.setProductids(bundle.getProductids());
            existingBundle.setTotalPrice(bundle.getTotalPrice());
            existingBundle.setCompanyid(bundle.getCompanyid());
            return bundleRepository.save(existingBundle);
        } else {
            throw new BundleNotFoundException("Bundle with ID " + id + " not found.");
        }
    }

    @Override
    public void deleteBundle(String id) throws BundleNotFoundException {
        Optional<Bundle> optional = bundleRepository.findById(id);
        if (optional.isPresent()) {
            bundleRepository.deleteById(id);
        } else {
            throw new BundleNotFoundException("Bundle with ID " + id + " not found.");
        }
    }
}
