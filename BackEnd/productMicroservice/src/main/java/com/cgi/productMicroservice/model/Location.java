package com.cgi.productMicroservice.model;

public class Location {
	
	private String locationName;
	private double locationPrice;
	
	public Location() {}
	
	public Location(String locationName, double locationPrice) {
		super();
		this.locationName = locationName;
		this.locationPrice = locationPrice;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	public double getLocationPrice() {
		return locationPrice;
	}

	public void setLocationPrice(double locationPrice) {
		this.locationPrice = locationPrice;
	}
	
}
