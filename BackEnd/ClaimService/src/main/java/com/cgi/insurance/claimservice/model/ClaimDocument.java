package com.cgi.insurance.claimservice.model;

import java.time.LocalDate;
import java.util.Date;

public class ClaimDocument {

	
	private String documentId;
	private String url;
	private LocalDate date;
	private String information;
	
	public ClaimDocument() {
		this.date = LocalDate.now();
	}

	public ClaimDocument(String documentId, String url, String information) {
		this.documentId = documentId;
		this.url = url;
		this.date = LocalDate.now();
		this.information = information;
	}

	public String getDocumentId() {
		return documentId;
	}

	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getInformation() {
		return information;
	}

	public void setInformation(String information) {
		this.information = information;
	}
	
	
	
}
