package com.cgi.insurance.product_purchased_service.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cgi.insurance.product_purchased_service.exception.PPIdAlreadyExistsException;
import com.cgi.insurance.product_purchased_service.exception.PPIdNotExistsException;
import com.cgi.insurance.product_purchased_service.model.ProductPurchased;
import com.cgi.insurance.product_purchased_service.service.ProductPurchasedService;
import org.springframework.validation.FieldError;
@RestController
@RequestMapping("/api/v1/purchased")
public class ProductPurchasedController {
    private final ProductPurchasedService ppService;

	/*
	 * Autowiring should be implemented for the NewsService. (Use Constructor-based
	 * autowiring) Please note that we should not create any object using the new
	 * keyword
	 */
	@Autowired
	public ProductPurchasedController(ProductPurchasedService ppService) {
		this.ppService = ppService;
	}

    
    /** 
     * @param ex if there is any MethodArgumentNotValidException 
     * @return Map<String, String> with the field name and the invalid reason
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String,String> handleValidationException(MethodArgumentNotValidException  ex){
        Map<String , String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error)->{
            String fieldName = ((FieldError)error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName,errorMessage);
        });
    return errors;
    }
    
    
    /** 
     * @param pp the productPurchased needs to be added to the database
     * @return ResponseEntity<?> HttpStatus.CREATED Or HttpStatus.CONFLICT
     */
    @PostMapping("/add")
	public ResponseEntity<?> addProductPurchased(@RequestBody ProductPurchased pp) {
	    try {
            ProductPurchased result = ppService.addProductPurchased(pp);
            return new ResponseEntity<ProductPurchased>(result, HttpStatus.CREATED);
        } catch (PPIdAlreadyExistsException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
        }

	}

    
    /** 
     * @param pp the new productPurchased with all the field updated
     * @param ppId 
     * @return ResponseEntity<?> HttpStatus.OK if succeed, HttpStatus.NOT_FOUND if the ppid not found
     */
    @PutMapping("/update/{ppId}")
	public ResponseEntity<?> updateProductPurchased(@RequestBody ProductPurchased pp, @PathVariable String ppId)  {
	    try {
            if(ppId==null){
                return new ResponseEntity<String>("ppId cannout be null", HttpStatus.BAD_REQUEST);
            }
            ProductPurchased result = ppService.updateProductPurchased(pp);
            return new ResponseEntity<ProductPurchased>(result, HttpStatus.OK);
        } catch (PPIdNotExistsException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

	}
    
    
    /** 
     * @param ppId the ppid needs to be removed
     * @return ResponseEntity<?> HttpStatus.OK if succeed, HttpStatus.NOT_FOUND if the ppid not found
     */
    @DeleteMapping("/delete/{ppId}")
    public ResponseEntity<?> deleteProductPurchased(@PathVariable String ppId)  {
	    try {
            if(ppId==null){
                return new ResponseEntity<String>("ppId cannout be null", HttpStatus.BAD_REQUEST);
            }  
            ppService.deleteProdcutPurchased(ppId);
            return new ResponseEntity<String>("Record deleted!", HttpStatus.OK);
        } catch (PPIdNotExistsException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

	}
    
    
    /** 
     * @return ResponseEntity<?> return HttpStatus.OK with all the productPurchased
     */
    @GetMapping("/viewAll")
    public ResponseEntity<?> getAllProductPurchased()  {
            
        List<ProductPurchased> result = ppService.getAllProductPurchased();
        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);


	}
    
    
    /** 
     * @param productId
     * @return ResponseEntity<?>return HttpStatus.OK with all the productPurchased that with the productId equal to the param
     */
    @GetMapping("/view/product/{productId}")
    public ResponseEntity<?> getAllProductPurchasedByProductId(@PathVariable String productId) {
        if(productId==null){
            return new ResponseEntity<String>("productId cannout be null", HttpStatus.BAD_REQUEST);
        }   
        List<ProductPurchased> result = ppService.getAllProductPurchasedByProductId(productId);
        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);
	}

    
    /** 
     * @param clientId
     * @return ResponseEntity<?> return HttpStatus.OK with all the productPurchased that with the productId equal to the param
     */
    @GetMapping("/view/client/{clientId}")
    public ResponseEntity<?> getAllProductPurchasedByClientId(@PathVariable String clientId) {  
        if(clientId==null){
            return new ResponseEntity<String>("clientId cannout be null", HttpStatus.BAD_REQUEST);
        }        
        List<ProductPurchased> result = ppService.getAllProductPurchasedByClientId(clientId);
        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);
	}

    
    /** 
     * @param clientId
     * @return ResponseEntity<?>return HttpStatus.OK with all the productPurchased that with the productId equal to the param and not in any bundles
     */
    @GetMapping("/view/notbundle/client/{clientId}")
    public ResponseEntity<?> getAllProductPurchasedByClientIdNotInBundles(@PathVariable String clientId) {
        if(clientId==null){
            return new ResponseEntity<String>("clientId Id cannout be null", HttpStatus.BAD_REQUEST);
        }       
        List<ProductPurchased> result = ppService.getAllProductPurchasedByClientIdNotInBundles(clientId);
        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);
	}

    @GetMapping("/view/bundle/{bundleId}")
    public ResponseEntity<?> getAllProductPurchasedByBundleId(@PathVariable String bundleId) {        
        if(bundleId==null){
            return new ResponseEntity<String>("Bundle Id cannout be null", HttpStatus.BAD_REQUEST);
        } 
        List<ProductPurchased> result = ppService.getAllProductPurchasedByBundleId(bundleId);
        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);
	}
    
    
    /** 
     * @param companyId
     * @return ResponseEntity<?> return HttpStatus.OK with all the productPurchased provided by the company
     */
    @GetMapping("/view/company/{companyId}")
    public ResponseEntity<?> getAllProductPurchasedByCompanyId(@PathVariable String companyId) { 
        if(companyId==null){
            return new ResponseEntity<String>("companyId Id cannout be null", HttpStatus.BAD_REQUEST);
        }            
        List<ProductPurchased> result = ppService.getAllProductPurchasedByCompanyId(companyId);
        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);
	}

    
    /** 
     * @param clientId
     * @param bundleId
     * @return ResponseEntity<?> return HttpStatus.OK with all the productPurchased with specific cientId and bundleId
     */
    @GetMapping("/view/bundle/{clientId}/{bundleId}")
    public ResponseEntity<?> getALlProductPurchasedByClientIdAndBundleId(@PathVariable String clientId,@PathVariable String bundleId) { 
        if(clientId==null || bundleId==null){
            return new ResponseEntity<String>("clientId and bundleId cannout be null", HttpStatus.BAD_REQUEST);
        }    
        List<ProductPurchased> result = ppService.getALlProductPurchasedByClientIdAndBundleId(clientId,bundleId);
        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);
    }
	
    
    /** 
     * @param ppId
     * @return ResponseEntity<?> return HttpStatus.OK with the productPurchased if found,  HttpStatus.NOT_FOUND if not found
     */
    @GetMapping("/view/id/{ppId}")
    public ResponseEntity<?> getProductPurchasedByPPId(@PathVariable String ppId) {   
        if(ppId==null){
            return new ResponseEntity<String>("ppId cannout be null", HttpStatus.BAD_REQUEST);
        }          
        ProductPurchased result = ppService.getProductPurchasedByPPId(ppId);
        if(result!=null){
            return new ResponseEntity<ProductPurchased>(result, HttpStatus.OK);
        }
        return new ResponseEntity<String>("not found", HttpStatus.NOT_FOUND);
	}

        /** 
     * @param ppId
     * @return ResponseEntity<?> return HttpStatus.OK with the productPurchased if found,  HttpStatus.NOT_FOUND if not found
     */
    @GetMapping("/view/client/{clientId}/product/{productId}")
    public ResponseEntity<?> getProductPurchasedByClientIdAndProductId(@PathVariable String clientId, @PathVariable String productId) {   
        if(clientId==null || productId==null){
            return new ResponseEntity<String>("clientId and productId cannout be null", HttpStatus.BAD_REQUEST);
        }          
        List<ProductPurchased> result = ppService.getAllProductPurchasedByClientIdAndProductId(clientId,productId);

        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);

	}


    @GetMapping("/view/client/{clientId}/date/{date}")
    public ResponseEntity<?> getProductPurchasedByClientIdAndDate(@PathVariable String clientId, @PathVariable LocalDate date) {   
        if(clientId==null || date==null){
            return new ResponseEntity<String>("clientId and date cannout be null", HttpStatus.BAD_REQUEST);
        }          
        List<ProductPurchased> result = ppService.getAllProductPurchasedByClientIdPurchaseDate(clientId,date);

        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);

	}


    @GetMapping("/view/company/{companyId}/product/{productId}")
    public ResponseEntity<?> getProductPurchasedByCompanyIdAndProductId(@PathVariable String companyId, @PathVariable String productId) {   
        if(companyId==null || productId==null){
            return new ResponseEntity<String>("companyId and productId cannout be null", HttpStatus.BAD_REQUEST);
        }          
        List<ProductPurchased> result = ppService.getAllProductPurchasedByCompanyIdAndProductId(companyId,productId);

        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);
	}

    @GetMapping("/view/company/{companyId}/bundle/{bundleId}")
    public ResponseEntity<?> getProductPurchasedByCompanyIdAndBundleId(@PathVariable String companyId, @PathVariable String bundleId) {   
        if(companyId==null || bundleId==null){
            return new ResponseEntity<String>("companyId and productId bundleId be null", HttpStatus.BAD_REQUEST);
        }          
        List<ProductPurchased> result = ppService.getAllProductPurchasedByCompanyIdAndBundleId(companyId,bundleId);

        return new ResponseEntity<List<ProductPurchased>>(result, HttpStatus.OK);
	}
}
