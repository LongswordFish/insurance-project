package com.cgi.productMicroservice.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cgi.productMicroservice.exception.LocationNotFoundException;
import com.cgi.productMicroservice.exception.ProductAlreadyExistsException;
import com.cgi.productMicroservice.exception.ProductNotFoundException;
import com.cgi.productMicroservice.model.Product;
import com.cgi.productMicroservice.service.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/products")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/add")
	public ResponseEntity<?> addProduct(@RequestBody Product newProduct){
		try {
			Product createdProduct = productService.createProduct(newProduct);
			return new ResponseEntity<Product>(createdProduct, HttpStatus.CREATED);
		} catch (ProductAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/view/all")
	public ResponseEntity<?> viewAllProducts(){
		List<Product> products = productService.getAllProducts();
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}
	
	@PutMapping("/update/{productId}")
	public ResponseEntity<?> updateProduct(@PathVariable("productId") String productID, @RequestBody Product product){
		try {
			Product updatedProduct = productService.updateProduct(productID, product);
			return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
		} catch (ProductNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	@DeleteMapping("/delete/{productId}")
	public ResponseEntity<?> removeProduct(@PathVariable("productId") String productID){
		try {
			productService.deleteProduct(productID);
			return new ResponseEntity<String>("Product with ID:"+productID+" deleted successfully.", HttpStatus.OK);
		} catch (ProductNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/view/{productId}")
	public ResponseEntity<?> viewProductByProductID(@PathVariable("productId") String productID){
		try {
			Product product = productService.getProductByProductID(productID);
			return new ResponseEntity<Product>(product, HttpStatus.OK);
		} catch (ProductNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/view/products-by-company/{companyId}")
	public ResponseEntity<?> viewProductByCompanyID(@PathVariable("companyId") String companyId){
		List<Product> products = productService.getAllProductsByCompanyID(companyId);
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}
	
	@GetMapping("/view/products-by-category/{category}")
	public ResponseEntity<?> viewProductsByCategory(@PathVariable("category") String category){
		if(category.toLowerCase().equals("home") || category.toLowerCase().equals("life") || category.toLowerCase().equals("auto")) {
			List<Product> products = productService.getAllProductsByCategory(category);
			return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
		}else return new ResponseEntity<String>("Invalid Category Provided..", HttpStatus.CONFLICT);
		
	}
	
	@DeleteMapping("/delete/products-by-company/{companyId}")
	public ResponseEntity<?> deleteProductsByCompanyID(@PathVariable("companyId") String companyId){
		productService.deleteByCompanyId(companyId);
		return new ResponseEntity<String>("Products of companyID:"+companyId+" deleted successfully.", HttpStatus.OK);
	}
	
	@GetMapping("/view/products-available")
	public ResponseEntity<?> viewAllProductsByAvailability(){
		List<Product> products = productService.viewAvailableProducts();
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}
	
	@GetMapping("/view/all/{companyId}")
	public ResponseEntity<?> viewAllProductsByAvailabilityAndCompanyId(@PathVariable("companyId") String companyId){
		List<Product> products = productService.viewAvailableProductsByCompanyId(companyId);
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}
	
	@PutMapping("/update/setProductAvailability/{productId}")
	public ResponseEntity<?> setProductAvailability(@PathVariable String productId){
		try {
			productService.setProductAvailableByProductId(productId);
		} catch (ProductNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<String>("Product with ID:"+productId+" is made available", HttpStatus.OK);
	}

	@GetMapping("/location/{locationName}")
	public ResponseEntity<?> getProductsByLocationName(@PathVariable String locationName){
		try {
			List<Product> products = productService.getProductsByLocationName(locationName);
			return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
		} catch (LocationNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
}
