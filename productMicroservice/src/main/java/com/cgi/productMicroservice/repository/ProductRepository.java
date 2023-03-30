package com.cgi.productMicroservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cgi.productMicroservice.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

	Product findByProductId(String productId);
	List<Product> findByCompanyId(String companyId);
	List<Product> findByCategory(String category);
	
	void deleteByCompanyId(String companyId);
	List<Product> findByIsAvailable(boolean isAvailable);
	List<Product> findByCompanyIdAndIsAvailable(String companyId, boolean isAvailable);
	
	List<Product> findByLocationsLocationName(String locationName);
}
