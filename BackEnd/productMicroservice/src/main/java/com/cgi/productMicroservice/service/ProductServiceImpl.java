package com.cgi.productMicroservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cgi.productMicroservice.exception.LocationNotFoundException;
import com.cgi.productMicroservice.exception.ProductNotFoundException;
import com.cgi.productMicroservice.model.Product;
import com.cgi.productMicroservice.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	ProductRepository productRepo;

	@Override
	public Product createProduct(Product product){
        return productRepo.save(product);
	}

	@Override
	public Product updateProduct(String productID, Product product) throws ProductNotFoundException {
		// Checking if product already exists
		Optional<Product> _product = productRepo.findById(product.getProductId());
		if(_product.isEmpty()) throw new ProductNotFoundException("Product with given Id not found.");
		else {
			// Updating the product record
	        product.setProductId(_product.get().getProductId());
	        return productRepo.save(product);
		}
	}

	@Override
	public boolean deleteProduct(String productID) throws ProductNotFoundException {
		// Checking if product exists
		Optional<Product> _product = productRepo.findById(productID);
		if(_product.isEmpty()) {
			throw new ProductNotFoundException("Product with given Id not found.");
		}
		productRepo.deleteById(productID);
		return true;
	}

	@Override
	public Product getProductByProductID(String productID) throws ProductNotFoundException {
		Optional<Product> product =  productRepo.findById(productID);
		if(product.isEmpty()) throw new ProductNotFoundException("Product with given Id not found");
		return product.get();
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepo.findAll();
	}

	@Override
	public List<Product> getAllProductsByCompanyID(String companyId) {
		return productRepo.findByCompanyId(companyId);
	}

	@Override
	public List<Product> getAllProductsByCategory(String category) {
		return productRepo.findByCategory(category);
	}

	@Override
	public void deleteByCompanyId(String companyId) {
		productRepo.deleteByCompanyId(companyId);
		return;
	}

	@Override
	public List<Product> viewAvailableProducts() {
		return productRepo.findByIsAvailable(true);
	}

	@Override
	public List<Product> viewAvailableProductsByCompanyId(String companyId) {
		return productRepo.findByCompanyIdAndIsAvailable(companyId, true);
	}

	@Override
	public Product setProductAvailableByProductId(String productId) throws ProductNotFoundException {
		// Checking if product exists
		Optional<Product> _product = productRepo.findById(productId);
		if(_product.isEmpty()) throw new ProductNotFoundException("Product with given Id not found.");
		_product.get().setAvailable(true);
		return productRepo.save(_product.get());
	}

	@Override
	public List<Product> getProductsByLocationName(String locationName) throws LocationNotFoundException {
		List<Product> productsList = productRepo.findByLocationsLocationName(locationName);
		if(productsList.isEmpty()) {
			throw new LocationNotFoundException("No products found for location: "+locationName);
		}
		return productsList;
	}

	

}
