package com.cgi.insurance.product_purchased_service.service;

import java.time.LocalDate;
import java.util.List;

import com.cgi.insurance.product_purchased_service.exception.PPIdAlreadyExistsException;
import com.cgi.insurance.product_purchased_service.exception.PPIdNotExistsException;
import com.cgi.insurance.product_purchased_service.model.ProductPurchased;

public interface ProductPurchasedService {

    ProductPurchased addProductPurchased(ProductPurchased pp) throws PPIdAlreadyExistsException;
    ProductPurchased updateProductPurchased(ProductPurchased pp) throws PPIdNotExistsException;
    void deleteProdcutPurchased(String ppid) throws PPIdNotExistsException;
    List<ProductPurchased> getAllProductPurchased();
    List<ProductPurchased> getAllProductPurchasedByProductId(String productId);
    List<ProductPurchased> getAllProductPurchasedByClientId(String clientId);
    List<ProductPurchased> getAllProductPurchasedByClientIdNotInBundles(String clientId);
    List<ProductPurchased> getAllProductPurchasedByBundleId(String bundleId);
    List<ProductPurchased> getAllProductPurchasedByCompanyId(String companyId);
    List<ProductPurchased> getAllProductPurchasedByClientIdAndProductId(String clientId, String productId);
    List<ProductPurchased> getALlProductPurchasedByClientIdAndBundleId(String clientId, String bundleId);
    ProductPurchased getProductPurchasedByPPId(String ppid);
    List<ProductPurchased> getAllProductPurchasedByClientIdPurchaseDate(String clientId,LocalDate date);
    List<ProductPurchased> getAllProductPurchasedByClientIdAndProductName(String clientId,String productName);
    List<String> getAllClientIdByProductId(String productId);
    List<String> getAllBundleIdByClientId(String clientId);
    List<ProductPurchased> getAllProductPurchasedByCompanyIdAndProductId(String companyId, String productId);
    List<ProductPurchased> getAllProductPurchasedByCompanyIdAndBundleId(String companyId, String bundleId);
}
