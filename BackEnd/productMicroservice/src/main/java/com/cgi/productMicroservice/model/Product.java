package com.cgi.productMicroservice.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
	
	  @Id
	  private String productId;
	  private String category;
	  private String picture;
	  private String name;
	  private String description;
	  private double price;
	  private List<Location> locations;
	  private String companyId;
	  private boolean isAvailable;
	  
	public Product() {}
	
	public Product(String productId, String category, String picture, String name, String description, double price,
			List<Location> locations, String companyId, boolean isAvailable) {
		super();
		this.productId = productId;
		this.category = category;
		this.picture = picture;
		this.name = name;
		this.description = description;
		this.price = price;
		this.locations = locations;
		this.companyId = companyId;
		this.isAvailable = isAvailable;
	}
	
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public List<Location> getLocations() {
		return locations;
	}
	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}
	public boolean isAvailable() {
		return isAvailable;
	}
	public void setAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	

}

