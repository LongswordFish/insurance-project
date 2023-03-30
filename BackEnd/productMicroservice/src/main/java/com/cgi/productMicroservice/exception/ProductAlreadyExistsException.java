package com.cgi.productMicroservice.exception;

public class ProductAlreadyExistsException extends Exception {

	public ProductAlreadyExistsException(String message) {
		super(message);
	}
}