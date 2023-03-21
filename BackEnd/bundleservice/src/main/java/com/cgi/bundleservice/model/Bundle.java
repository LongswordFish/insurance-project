package com.cgi.bundleservice.model;

import java.util.List;

import org.springframework.data.annotation.Id;


public class Bundle {

	 @Id
	    private String bundleid;
	    
	    private List<String> productids;
	    
	    private Double totalPrice;
	    
	    private String location;
	    
	    private String companyid;

	    public Bundle(String bundleid, List<String> productids, Double totalPrice, String location, String companyid) {
	    	this.bundleid = bundleid;
	        this.productids = productids;
	        this.totalPrice = totalPrice;
	        this.location = location;
	        this.companyid = companyid;
	    }
	    
		public String getBundleid() {
			return bundleid;
		}

		public void setBundleid(String bundleid) {
			this.bundleid = bundleid;
		}

		public List<String> getProductids() {
			return productids;
		}

		public void setProductids(List<String> productids) {
			this.productids = productids;
		}

		public Double getTotalPrice() {
			return totalPrice;
		}

		public void setTotalPrice(Double totalPrice) {
			this.totalPrice = totalPrice;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public String getCompanyid() {
			return companyid;
		}

		public void setCompanyid(String companyid) {
			this.companyid = companyid;
		}
	    
	    
}
