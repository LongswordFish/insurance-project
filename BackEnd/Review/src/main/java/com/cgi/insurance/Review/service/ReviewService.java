package com.cgi.insurance.Review.service;

import java.util.List;

import com.cgi.insurance.Review.exceptions.CompanyIdDoesNotExistException;
import com.cgi.insurance.Review.exceptions.CustomerIdDoesNotExistException;
import com.cgi.insurance.Review.exceptions.ProductIdDoesNotExistException;
import com.cgi.insurance.Review.exceptions.ReviewIdDoesNotExistException;
import com.cgi.insurance.Review.model.Review;

public interface ReviewService {
	
	Review addReview(Review review); //client adds review
	List<Review> getAllReviews(); //admin views all reviews
	Review getReviewById(String reviewId) throws ReviewIdDoesNotExistException; //admin views by reviewId
	List<Review> getReviewByProduct(String productId) throws ProductIdDoesNotExistException; //company views by productId 
	List<Review> getReviewByCompany(String companyId) throws CompanyIdDoesNotExistException; //company or admin views by companyId
	List<Review> getReviewByCustomer(String customerId) throws CustomerIdDoesNotExistException; //company, admin or customer views by customerId
	Review deleteReview(String reviewId) throws ReviewIdDoesNotExistException; //client, admin or company deletes review
	Review updateReview(Review review) throws ReviewIdDoesNotExistException;
	int getAverageByCompany(String companyId) throws CompanyIdDoesNotExistException;
	List<Review> getReviewByCustomerAndProduct(String customerId, String productId);
	List<Review> getReviewByCustomerAndCompany(String customerId, String companyId);
	List<Review> getReviewByProductAndCompany(String productId, String companyId);
}
