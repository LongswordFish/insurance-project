package com.cgi.insurance.product_purchased_service.model;


import java.time.LocalDate;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;

@Document
public class ProductPurchased {
    @Id
    String ppId;

    @NotBlank
    String productId;
    
    @NotBlank
    String companyId;

    @NotBlank
    String clientId;
    LocalDate purchaseDate = LocalDate.now();
    String bundleId; 
    String userDesription;
    
    @NotBlank
    double quotePrice;

    @NotBlank
    String location;

    /** 
     * constructor
     */
    public ProductPurchased(String ppId, @NotBlank String productId, @NotBlank String companyId,
            @NotBlank String clientId, String bundleId, String userDesription, @NotBlank double quotePrice,@NotBlank String location) {
        this.ppId = ppId;
        this.productId = productId;
        this.companyId = companyId;
        this.clientId = clientId;
        this.bundleId = bundleId;
        this.userDesription = userDesription;
        this.quotePrice = quotePrice;
        this.location = location;
    }

    /** 
     * No argument constructor
     */
    public ProductPurchased() {
    }

    public String getPpId() {
        return ppId;
    }

    public void setPpId(String ppId) {
        this.ppId = ppId;
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

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getBundleId() {
        return bundleId;
    }

    public void setBundleId(String bundleId) {
        this.bundleId = bundleId;
    }

    public String getUserDesription() {
        return userDesription;
    }

    public void setUserDesription(String userDesription) {
        this.userDesription = userDesription;
    }

    public double getQuotePrice() {
        return quotePrice;
    }

    public void setQuotePrice(double quotePrice) {
        this.quotePrice = quotePrice;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
