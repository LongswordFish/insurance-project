package com.cgi.insurance.Review.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cgi.insurance.Review.exceptions.CompanyIdDoesNotExistException;
import com.cgi.insurance.Review.exceptions.CustomerIdDoesNotExistException;
import com.cgi.insurance.Review.exceptions.ProductIdDoesNotExistException;
import com.cgi.insurance.Review.exceptions.ReviewIdDoesNotExistException;
import com.cgi.insurance.Review.model.Review;
import com.cgi.insurance.Review.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService {
	
	@Autowired
	ReviewRepository reviewRepo;

	@Override
	public Review addReview(Review review){
			return reviewRepo.save(review);
	
	}

	@Override
	public List<Review> getAllReviews() {
		List<Review> allReviews =  reviewRepo.findAll();
		return allReviews;
	}

	@Override
	public Review getReviewById(String reviewId) throws ReviewIdDoesNotExistException {
		Optional<Review> optreview=reviewRepo.findById(reviewId);
		if (optreview.isEmpty()) {
			throw new ReviewIdDoesNotExistException("Id does not exist");
		}
		else {
			Review existreview=optreview.get();
			return existreview;
		}
	}

	@Override
	public List<Review> getReviewByProduct(String productId) throws ProductIdDoesNotExistException{
		List<Review> reviewList =  reviewRepo.findByProductId(productId);
		if (reviewList.isEmpty()) {
			throw new ProductIdDoesNotExistException("");
		}
		else
		{
			return reviewList;
		}
	}

	@Override
	public List<Review> getReviewByCompany(String companyId) throws CompanyIdDoesNotExistException{
		List<Review> reviewList =  reviewRepo.findByCompanyId(companyId);
		if (reviewList.isEmpty()) {
			throw new CompanyIdDoesNotExistException("");
		}
		else
		{
			return reviewList;
		}
	}

	@Override
	public List<Review> getReviewByCustomer(String customerId) throws CustomerIdDoesNotExistException {
		List<Review> reviewList =  reviewRepo.findByCustomerId(customerId);
		if (reviewList.isEmpty()) {
			throw new CustomerIdDoesNotExistException("");
		}
		else
		{
			return reviewList;
		}
	}

	@Override
	public Review deleteReview(String reviewId) throws ReviewIdDoesNotExistException {
		Optional<Review> optreview=reviewRepo.findById(reviewId);
		if(optreview.isPresent())
		{
			reviewRepo.deleteById(reviewId);
			return optreview.get();
		}
		else
			throw new ReviewIdDoesNotExistException("Review does not exist");
	}

	@Override
	public Review updateReview(Review review) throws ReviewIdDoesNotExistException {
		Optional<Review> optreview = reviewRepo.findById(review.getReviewId());
		if(optreview.isPresent())
		{
			Review currreview = optreview.get();
			currreview.setReviewTitle(review.getReviewTitle());
			currreview.setRating(review.getRating());
			currreview.setFeedback(review.getFeedback());
			currreview.setReviewCreated_date(review.getReviewCreated_date());
			return reviewRepo.save(currreview);
		}
		else
			throw new ReviewIdDoesNotExistException("Review does not exist");
	}

	@Override
	public int getAverageByCompany(String companyId) throws CompanyIdDoesNotExistException {
		List<Review> companylist = reviewRepo.findByCompanyId(companyId);
		if (companylist.isEmpty()) {
			throw new CompanyIdDoesNotExistException("");
		}
		else {
			int sumrating=0;
			int count =0;
			for (Review review : companylist) {
				sumrating = sumrating + review.getRating();
				count = count + 1;
			}
			int avgrating = sumrating/count;
			return avgrating;
		}
	}

	@Override
	public List<Review> getReviewByCustomerAndProduct(String customerId, String productId) {
		List<Review> reviewList = reviewRepo.findByCustomerIdAndProductId(customerId,productId);
		return reviewList;
	}

	@Override
	public List<Review> getReviewByCustomerAndCompany(String customerId, String companyId) {
		List<Review> reviewList = reviewRepo.findByCustomerIdAndCompanyId(customerId,companyId);
		return reviewList;
	}

	@Override
	public List<Review> getReviewByProductAndCompany(String productId, String companyId) {
		List<Review> reviewList = reviewRepo.findByProductIdAndCompanyId(productId,companyId);
		return reviewList;
	}	
}
