package com.cgi.bundleservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cgi.bundleservice.exception.BundleNotFoundException;
import com.cgi.bundleservice.model.Bundle;
import com.cgi.bundleservice.service.BundleService;

import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/bundles")
public class BundleController {
    
    @Autowired
    BundleService bundleService;

//    getting all bundles
    @GetMapping
    public List<Bundle> getAllBundles() {
        return bundleService.getAllBundles();
    }

//    getting bundle by id
    @GetMapping("/view/{id}")
    public ResponseEntity<Bundle> getBundleById(@PathVariable String id) {
        try {
            Bundle bundle = bundleService.getBundleById(id);
            return new ResponseEntity<>(bundle, HttpStatus.OK);
        } catch (BundleNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

//    adding the bundle
    @PostMapping("/create")
    public ResponseEntity<Bundle> createBundle(@RequestBody Bundle bundle) {
        Bundle createdBundle = bundleService.createBundle(bundle);
        return new ResponseEntity<>(createdBundle, HttpStatus.CREATED);
    }

//    updating the bundle
    @PutMapping("/update/{id}")
    public ResponseEntity<Bundle> updateBundle(@PathVariable String id, @RequestBody Bundle bundle) {
        try {
            Bundle updatedBundle = bundleService.updateBundle(id, bundle);
            return new ResponseEntity<>(updatedBundle, HttpStatus.OK);
        } catch (BundleNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }


//    deleting the bundle
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBundle(@PathVariable String id) {
        try {
            bundleService.deleteBundle(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (BundleNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

}