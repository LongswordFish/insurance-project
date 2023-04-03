package com.cgi.insurance.Review.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cgi.insurance.Review.model.Review;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String>{
	
	List<Review> findByProductId(String productId);
	List<Review> findByCompanyId(String companyId);
	List<Review> findByCustomerId(String customerId);
	List<Review> findByCustomerIdAndProductId(String customerId, String productId);
	List<Review> findByCustomerIdAndCompanyId(String customerId, String companyId);
	List<Review> findByProductIdAndCompanyId(String productId, String companyId);
}
