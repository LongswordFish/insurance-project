package com.cgi.insurance.Review.model;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Review {
	
	@Id
	private String reviewId;
	
	private String customerId;
	private String companyId;
	private String productId;
	
	LocalDate reviewCreated_date = LocalDate.now();
	private String reviewTitle;
	private int rating;
	private String feedback;
	
	public Review(String reviewId, String customerId, String companyId, String productId, LocalDate reviewCreated_date,
			int rating, String feedback, String reviewTitle) {
		this.reviewId = reviewId;
		this.customerId = customerId;
		this.companyId = companyId;
		this.productId = productId;
		this.reviewTitle = reviewTitle;
		this.rating = rating;
		this.feedback = feedback;
	}
	
	
	public Review() {
		// TODO Auto-generated constructor stub
	}


	public String getReviewTitle() {
		return reviewTitle;
	}

	public void setReviewTitle(String reviewTitle) {
		this.reviewTitle = reviewTitle;
	}

	public String getReviewId() {
		return reviewId;
	}
	public void setReviewId(String reviewId) {
		this.reviewId = reviewId;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public LocalDate getReviewCreated_date() {
		return reviewCreated_date;
	}
	public void setReviewCreated_date(LocalDate reviewCreated_date) {
		this.reviewCreated_date = reviewCreated_date;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	
}
