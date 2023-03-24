package com.cgi.bundleservice.exception;

public class BundleNotFoundException extends RuntimeException {
    public BundleNotFoundException(String message) {
        super(message);
    }
}
