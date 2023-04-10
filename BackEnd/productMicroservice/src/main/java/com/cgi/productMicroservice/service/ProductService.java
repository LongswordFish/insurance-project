package com.cgi.productMicroservice.service;

import java.util.List;

import com.cgi.productMicroservice.exception.LocationNotFoundException;
import com.cgi.productMicroservice.exception.ProductAlreadyExistsException;
import com.cgi.productMicroservice.exception.ProductNotFoundException;
import com.cgi.productMicroservice.model.Product;

public interface ProductService {
	
	
	//create Product
	public Product createProduct(Product product) throws ProductAlreadyExistsException;
	
	//update Product
	public Product updateProduct(String productID, Product product) throws ProductNotFoundException;
	
	//delete Product
	public boolean deleteProduct(String productID) throws ProductNotFoundException;
	
	//get a Product by productID
	public Product getProductByProductID(String productID) throws ProductNotFoundException;
	
	//get all Products
	public List<Product> getAllProducts();
	
	//get all products by companyID
	public List<Product> getAllProductsByCompanyID(String companyId);
	
	//get all products by category
	public List<Product> getAllProductsByCategory(String category);
	
	//delete all products by companyID
	public void deleteByCompanyId(String companyId);
	
	//get all products by availability(isAvailable=true)
	public List<Product> viewAvailableProducts();
	
	//get all products by availability(isAvailable=true) and by companyId
	public List<Product> viewAvailableProductsByCompanyId(String companyId);
	
	//make a product available by productId
	public Product setProductAvailableByProductId(String productId) throws ProductNotFoundException;
	
	//get all products by locations
	public List<Product> getProductsByLocationName(String locationName) throws LocationNotFoundException;
}
