package com.cgi.insurance.claimservice.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Claim {

	@Id
	private String claimId;
	
	private String customerId;
	private String productId;
	private String companyId;
	private LocalDate  date_created;
	private boolean isActive;
	private boolean isApproved;
	private String description;
	private String notes;
	
	private List<ClaimDocument> documents;
	
	public Claim() {
		this.claimId = new ObjectId().toString();
		this.date_created = LocalDate.now();
		this.isApproved = false;
	}

	public Claim(String customerId, String productId, String companyId,
			boolean isActive, String description, String notes, List<ClaimDocument> documents) {
		this.claimId = new ObjectId().toString();
		this.customerId = customerId;
		this.productId = productId;
		this.companyId = companyId;
		this.date_created = LocalDate.now();
		this.isActive = isActive;
		this.isApproved = false;
		this.description = description;
		this.notes = notes;
		this.documents = documents;
	}

	public String getClaimId() {
		return claimId;
	}

	public void setClaimId(String claimId) {
		this.claimId = claimId;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public LocalDate getDate_created() {
		return date_created;
	}

	public void setDate_created(LocalDate date_created) {
		this.date_created = date_created;
	}

	public boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public boolean getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public List<ClaimDocument> getDocuments() {
		return documents;
	}

	public void setDocuments(List<ClaimDocument> documents) {
		this.documents = documents;
	}
	
	
	
}
