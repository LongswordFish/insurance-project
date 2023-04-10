package com.cgi.insurance.product_purchased_service.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cgi.insurance.product_purchased_service.model.ProductPurchased;

@Repository
public interface ProductPurchasedRepository extends MongoRepository<ProductPurchased, String>{
    List<ProductPurchased> findByProductId(String productId);
    List<ProductPurchased> findByClientId(String clientId);
    List<ProductPurchased> findByCompanyId(String companyId);
    List<ProductPurchased> findByBundleId(String bundleId);
    List<ProductPurchased> findByClientIdAndProductId(String clientId, String productId);
    List<ProductPurchased> findByClientIdAndBundleId(String clientId, String bundleId);
    List<ProductPurchased> findByClientIdAndPurchaseDate(String clientId,LocalDate date);
    List<ProductPurchased> findByClientIdAndProductName(String clientId,String productName);
    List<ProductPurchased> findByCompanyIdAndBundleId(String companyId, String bundleId);
    List<ProductPurchased> findByCompanyIdAndProductId(String companyId, String productId);
}
