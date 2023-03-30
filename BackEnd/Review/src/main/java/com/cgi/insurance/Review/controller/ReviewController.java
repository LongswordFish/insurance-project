package com.cgi.insurance.Review.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cgi.insurance.Review.exceptions.CompanyIdDoesNotExistException;
import com.cgi.insurance.Review.exceptions.CustomerIdDoesNotExistException;
import com.cgi.insurance.Review.exceptions.ProductIdDoesNotExistException;
import com.cgi.insurance.Review.exceptions.ReviewIdDoesNotExistException;
import com.cgi.insurance.Review.model.Review;
import com.cgi.insurance.Review.service.ReviewService;

@CrossOrigin
@RestController
@RequestMapping("review")
public class ReviewController {
	
	@Autowired
	ReviewService rServ;
	
	@PostMapping("/add")
	public ResponseEntity<?> addReview(@RequestBody Review review)
	{
		Review addresult =rServ.addReview(review);
		return new ResponseEntity<Review>(addresult,HttpStatus.CREATED);
	}
	
	@GetMapping("/view")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviewList = rServ.getAllReviews();
        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }
	
	@GetMapping("/view/{reviewId}")
	public ResponseEntity<?> getReviewById(@PathVariable("reviewId") String reviewId)
	{
		Review review;
		try {
			review = rServ.getReviewById(reviewId);
			return new ResponseEntity<Review> (review,HttpStatus.OK);
		} catch (ReviewIdDoesNotExistException e) {
			return new ResponseEntity<String>("Review Id does not exist",HttpStatus.NOT_FOUND);
		}
		
	}
	
	@GetMapping("/view/product/{productId}")
    public ResponseEntity<?> getReviewByProduct(@PathVariable("productId") String productId) {
        List<Review> review;
		try {
			review = rServ.getReviewByProduct(productId);
			return new ResponseEntity<>(review, HttpStatus.OK);
		} catch (ProductIdDoesNotExistException e) {
			return new ResponseEntity<String>("Product does not exist",HttpStatus.NOT_FOUND);
		}
        
    }
	
	@GetMapping("/view/company/{companyId}")
    public ResponseEntity<?> getReviewByCompany(@PathVariable("companyId") String companyId) {
        List<Review> reviewList;
		try {
			reviewList = rServ.getReviewByCompany(companyId);
			return new ResponseEntity<>(reviewList, HttpStatus.OK);
		} catch (CompanyIdDoesNotExistException e) {
			return new ResponseEntity<String>("Company does not exist",HttpStatus.NOT_FOUND);
		}
    }
	
	@GetMapping("/view/customer/{customerId}")
    public ResponseEntity<?> getReviewByCustomer(@PathVariable("customerId") String customerId) {
        List<Review> reviewList;
		try {
			reviewList = rServ.getReviewByCustomer(customerId);
			return new ResponseEntity<>(reviewList, HttpStatus.OK);
		} catch (CustomerIdDoesNotExistException e) {
			return new ResponseEntity<String>("Customer does not exist",HttpStatus.NOT_FOUND);
		}
        
    }
	
	@DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable("reviewId") String reviewId) {
    	Review deletedReview;
		try {
			deletedReview = rServ.deleteReview(reviewId);
			return new ResponseEntity<>(deletedReview, HttpStatus.OK);
		} catch (ReviewIdDoesNotExistException e) {
			return new ResponseEntity<String>("Review does not exist",HttpStatus.NOT_FOUND);
		}
    }
	
	@PutMapping("/update")
    public ResponseEntity<?> updateReview(@RequestBody Review review) {
    	Review updatedReview;
		try {
			updatedReview = rServ.updateReview(review);
			return new ResponseEntity<>(updatedReview, HttpStatus.OK);
		} catch (ReviewIdDoesNotExistException e) {
			return new ResponseEntity<String>("Review does not exist",HttpStatus.NOT_FOUND);
		}
    	
    }
	
	@GetMapping("/view/rating/getaverage/{companyId}")
    public ResponseEntity<?> getAverageByCompany(@PathVariable("companyId") String companyId) {
        int average;
		try {
			average = rServ.getAverageByCompany(companyId);
			return new ResponseEntity<>(average, HttpStatus.OK);
		} catch (CompanyIdDoesNotExistException e) {
			return new ResponseEntity<String>("Company does not exist",HttpStatus.NOT_FOUND);
		}
    }
	
	@GetMapping("/view/customer/{customerId}/product/{productId}")
    public ResponseEntity<?> getReviewByCustomerAndProduct(@PathVariable("customerId") String customerId, @PathVariable("productId") String productId) {
        List<Review> reviewList = rServ.getReviewByCustomerAndProduct(customerId, productId);
        return new ResponseEntity<>(reviewList, HttpStatus.OK); 
    }
	
	@GetMapping("/view/customer/{customerId}/company/{companyId}")
    public ResponseEntity<?> getReviewByCustomerAndCompany(@PathVariable("customerId") String customerId, @PathVariable("companyId") String companyId) {
        List<Review> reviewList = rServ.getReviewByCustomerAndCompany(customerId, companyId);
        return new ResponseEntity<List<Review>>(reviewList, HttpStatus.OK); 
    }
	
	@GetMapping("/view/product/{productId}/company/{companyId}")
    public ResponseEntity<?> getReviewByProductAndCompany(@PathVariable("productId") String productId, @PathVariable("companyId") String companyId) {
        List<Review> reviewList = rServ.getReviewByProductAndCompany(productId, companyId);
        return new ResponseEntity<>(reviewList, HttpStatus.OK); 
    }
}
