package com.cgi.insurance.product_purchased_service.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cgi.insurance.product_purchased_service.exception.PPIdAlreadyExistsException;
import com.cgi.insurance.product_purchased_service.exception.PPIdNotExistsException;
import com.cgi.insurance.product_purchased_service.model.ProductPurchased;
import com.cgi.insurance.product_purchased_service.repository.ProductPurchasedRepository;


@Service
public class ProductPurchasedServiceImpl implements ProductPurchasedService{

    @Autowired
    private ProductPurchasedRepository ppRepo;
    

    /** 
     * @param pp - new productPurchased needs to be saved to database
     * @return ProductPurchased saved
     * @throws PPIdAlreadyExistsException
     */
    @Override
    public ProductPurchased addProductPurchased(ProductPurchased pp) throws PPIdAlreadyExistsException {
        if(pp.getPpId()!=null){
            if(getProductPurchasedByPPId(pp.getPpId())!=null){
                throw new PPIdAlreadyExistsException("ProductPurchased with id "+pp.getPpId()+" already exists!");
            }
        }

        return this.ppRepo.save(pp);
    }

    
    /** 
     * @param pp new productPurchased 
     * @return ProductPurchased after replaced
     * @throws PPIdNotExistsException
     */
    @Override
    public ProductPurchased updateProductPurchased(ProductPurchased pp) throws PPIdNotExistsException {
        if(pp.getPpId()==null || getProductPurchasedByPPId(pp.getPpId())==null){
            throw new PPIdNotExistsException("ProductPurchased with id "+pp.getPpId()+" not found!");
        }
        return this.ppRepo.save(pp);
    }

    
    /** 
     * @param ppId 
     * @throws PPIdNotExistsException
     */
    @Override
    public void deleteProdcutPurchased(String ppId) throws PPIdNotExistsException {
        if(getProductPurchasedByPPId(ppId)==null){
            throw new PPIdNotExistsException("ProductPurchased with id "+ppId+" not found!");
        }

        this.ppRepo.deleteById(ppId);
    }

    
    /** 
     * @return List<ProductPurchased>
     */
    @Override
    public List<ProductPurchased> getAllProductPurchased() {
        return this.ppRepo.findAll();
    }

    
    /** 
     * @param productId 
     * @return List<ProductPurchased> that has the ProductId field equals productId
     */
    @Override
    public List<ProductPurchased> getAllProductPurchasedByProductId(String productId) {
        return this.ppRepo.findByProductId(productId);
    }

    
    /** 
     * @param clientId
     * @return List<ProductPurchased> that has the ClientId
     */
    @Override
    public List<ProductPurchased> getAllProductPurchasedByClientId(String clientId) {
        return this.ppRepo.findByClientId(clientId);
    }

    
    /** 
     * @param bundleId
     * @return List<ProductPurchased> that has the bundleId
     */
    @Override
    public List<ProductPurchased> getAllProductPurchasedByBundleId(String bundleId) {
        return this.ppRepo.findByBundleId(bundleId);
    }

    
    /** 
     * @param clientId
     * @param bundleId
     * @return List<ProductPurchased> with the clientId and bundleId
     */
    @Override
    public List<ProductPurchased> getALlProductPurchasedByClientIdAndBundleId(String clientId, String bundleId) {
        return this.ppRepo.findByClientIdAndBundleId(clientId, bundleId);
    }

    
    /** 
     * @param ppId
     * @return ProductPurchased with the PPId equals to the parameter
     */
    @Override
    public ProductPurchased getProductPurchasedByPPId(String ppId) {
        Optional<ProductPurchased> ppOpt = this.ppRepo.findById(ppId);
        if(ppOpt.isPresent()){
            return ppOpt.get();
        }else{
            return null;
        }
    }

    
    /** 
     * @param clientId
     * @return List<ProductPurchased> bought by the cient but not in any bundles
     */
    @Override
    public List<ProductPurchased> getAllProductPurchasedByClientIdNotInBundles(String clientId) {
        List<ProductPurchased> pps = getAllProductPurchasedByClientId(clientId);
        if(pps.size()==0) return pps;
        return pps.stream().filter(p->(p.getBundleId()==null)).collect(Collectors.toList());

    }

    
    /** 
     * @param companyId
     * @return List<ProductPurchased> provided by the company
     */
    @Override
    public List<ProductPurchased> getAllProductPurchasedByCompanyId(String companyId) {
        return this.ppRepo.findByCompanyId(companyId);
    }


    @Override
    public List<ProductPurchased> getAllProductPurchasedByClientIdAndProductId(String clientId, String productId) {
        return this.ppRepo.findByClientIdAndProductId(clientId, productId);
    }


    @Override
    public List<ProductPurchased> getAllProductPurchasedByClientIdPurchaseDate(String clientId, LocalDate date) {
        return this.ppRepo.findByClientIdAndPurchaseDate(clientId, date);
    }


    @Override
    public List<ProductPurchased> getAllProductPurchasedByCompanyIdAndProductId(String companyId, String productId) {
        return this.ppRepo.findByCompanyIdAndProductId(companyId, productId);
    }


    @Override
    public List<ProductPurchased> getAllProductPurchasedByCompanyIdAndBundleId(String companyId, String bundleId) {
        return this.ppRepo.findByCompanyIdAndBundleId(companyId, bundleId);
    }

    
}
