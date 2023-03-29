package com.cgi.productMicroservice.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.cgi.productMicroservice.exception.LocationNotFoundException;
import com.cgi.productMicroservice.exception.ProductAlreadyExistsException;
import com.cgi.productMicroservice.exception.ProductNotFoundException;
import com.cgi.productMicroservice.model.Product;
import com.cgi.productMicroservice.service.ProductService;

public class ProductControllerTest {
	@InjectMocks
	ProductController productController;
	
	@Mock 
	ProductService productService;
	
	Product product; 
	
	@BeforeEach
    public void init()
    {
	   	MockitoAnnotations.openMocks(this);
   	 
	   	product=new Product();
		product.setProductId("PP123");
		product.setAvailable(false);
		product.setCategory("home");
		product.setCompanyId("CMP123");
		product.setDescription("test");
		product.setLocations(null);
		product.setName("Home insurance");
		product.setPicture("product.jpg");
		product.setPrice(100);
    }

	@Test
    public void testingAddProduct() throws Exception {

        // mock the productService to return the created product
        when(productService.createProduct(any(Product.class))).thenReturn(product);

        // perform the request
        ResponseEntity<?> responseEntity = productController.addProduct(product);

        // verify the response
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody() instanceof Product);
        assertEquals(product, responseEntity.getBody());

        // verify the productService was called
        verify(productService, Mockito.times(1)).createProduct(product);
    }
	
	
	@Test
    public void testingAddProductConflict() throws Exception {


        // mock the productService to throw a ProductAlreadyExistsException
        when(productService.createProduct(any(Product.class))).thenThrow(new ProductAlreadyExistsException("Product already exists"));

        // perform the request
        ResponseEntity<?> responseEntity = productController.addProduct(product);

        // verify the response
        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody() instanceof String);
        assertEquals("Product already exists", responseEntity.getBody());

        // verify the productService was called
        verify(productService, Mockito.times(1)).createProduct(product);
    }
	
	
	@Test
    public void testingViewAllProducts() {
        List<Product> mockProducts = new ArrayList<>();
        Product product1 = new Product();
		product1.setProductId("PP123");
		product1.setAvailable(true);
		product1.setCategory("home");
		product1.setCompanyId("CMP123");
		product1.setDescription("test");
		product1.setLocations(null);
		product1.setName("Home insurance");
		product1.setPicture("product.jpg");
		product1.setPrice(100);
		
		Product product2 =new Product();
		product2.setProductId("PP1231");
		product2.setAvailable(true);
		product2.setCategory("home");
		product2.setCompanyId("CMP123");
		product2.setDescription("test");
		product2.setLocations(null);
		product2.setName("Home insurance");
		product2.setPicture("product.jpg");
		product2.setPrice(100);
        mockProducts.add(product1);
        mockProducts.add(product2);
        Mockito.when(productService.getAllProducts()).thenReturn(mockProducts);

        ResponseEntity<?> response = productController.viewAllProducts();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockProducts, response.getBody());
    }
	
	
	@Test
    public void testingUpdateProduct() throws ProductNotFoundException {
        String productId = "123";
        Product mockProduct = new Product();
        mockProduct.setProductId(productId);
        mockProduct.setAvailable(true);
        mockProduct.setCategory("home");
        mockProduct.setCompanyId("CMP123");
        mockProduct.setDescription("test");
        mockProduct.setLocations(null);
        mockProduct.setName("Home insurance");
        mockProduct.setPicture("product.jpg");
        mockProduct.setPrice(100);
        Mockito.when(productService.updateProduct(productId, mockProduct)).thenReturn(mockProduct);

        ResponseEntity<?> response = productController.updateProduct(productId, mockProduct);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockProduct, response.getBody());
    }
	
	
	@Test
    public void testingUpdateProductWithProductNotFoundException() throws ProductNotFoundException {
        String productId = "123";
        Product mockProduct = new Product();
        mockProduct.setProductId(productId);
        mockProduct.setAvailable(true);
        mockProduct.setCategory("home");
        mockProduct.setCompanyId("CMP123");
        mockProduct.setDescription("test");
        mockProduct.setLocations(null);
        mockProduct.setName("Home insurance");
        mockProduct.setPicture("product.jpg");
        mockProduct.setPrice(100);
        Mockito.when(productService.updateProduct(productId, mockProduct)).thenThrow(new ProductNotFoundException("Product not found"));

        ResponseEntity<?> response = productController.updateProduct(productId, mockProduct);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Product not found", response.getBody());
    }
	
	
	@Test
    public void testingViewProductByProductID() throws ProductNotFoundException {
        String productId = "123";
        Product mockProduct = new Product();
        mockProduct.setProductId(productId);
        mockProduct.setAvailable(true);
        mockProduct.setCategory("home");
        mockProduct.setCompanyId("CMP123");
        mockProduct.setDescription("test");
        mockProduct.setLocations(null);
        mockProduct.setName("Home insurance");
        mockProduct.setPicture("product.jpg");
        mockProduct.setPrice(100);
        Mockito.when(productService.getProductByProductID(productId)).thenReturn(mockProduct);

        ResponseEntity<?> response = productController.viewProductByProductID(productId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockProduct, response.getBody());
    }
	
	
	@Test
    public void testingViewProductByProductIDWithProductNotFoundException() throws ProductNotFoundException {
        String productId = "123";
        Mockito.when(productService.getProductByProductID(productId)).thenThrow(new ProductNotFoundException("Product not found"));

        ResponseEntity<?> response = productController.viewProductByProductID(productId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Product not found", response.getBody());
    }
	
	
	@Test
    public void testingViewProductByCompanyID() {
        String companyId = "CMP123";
        List<Product> mockProducts = new ArrayList<>();
        Product product1 = new Product();
		product1.setProductId("PP123");
		product1.setAvailable(true);
		product1.setCategory("home");
		product1.setCompanyId("CMP123");
		product1.setDescription("test");
		product1.setLocations(null);
		product1.setName("Home insurance");
		product1.setPicture("product.jpg");
		product1.setPrice(100);
		
		Product product2 =new Product();
		product2.setProductId("PP1231");
		product2.setAvailable(true);
		product2.setCategory("home");
		product2.setCompanyId("CMP123");
		product2.setDescription("test");
		product2.setLocations(null);
		product2.setName("Home insurance");
		product2.setPicture("product.jpg");
		product2.setPrice(100);
        mockProducts.add(product1);
        mockProducts.add(product2);
        Mockito.when(productService.getAllProductsByCompanyID(companyId)).thenReturn(mockProducts);

        ResponseEntity<?> response = productController.viewProductByCompanyID(companyId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockProducts, response.getBody());
    }

	
	@Test
    public void testingViewProductsByCategory() {
        String category = "home";
        List<Product> products = new ArrayList<>();
        Mockito.when(productService.getAllProductsByCategory(category)).thenReturn(products);

        ResponseEntity<?> response = productController.viewProductsByCategory(category);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(products, response.getBody());
    }
	
	
	@Test
    public void testingDeleteProductsByCompanyID() {
        String companyId = "CMP1234";
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("Products of companyID:"+companyId+" deleted successfully.", HttpStatus.OK);

        ResponseEntity<?> response = productController.deleteProductsByCompanyID(companyId);

        Mockito.verify(productService, Mockito.times(1)).deleteByCompanyId(companyId);
        assertEquals(expectedResponse, response);
    }
	
	
	@Test
    public void testingViewAllProductsByAvailability() {
        List<Product> products = new ArrayList<>();
        Mockito.when(productService.viewAvailableProducts()).thenReturn(products);

        ResponseEntity<?> response = productController.viewAllProductsByAvailability();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(products, response.getBody());
    }
	
	
	@Test
    public void testingViewAllProductsByAvailabilityAndCompanyId() {
        String companyId = "CMP1234";
        List<Product> products = new ArrayList<>();
        Mockito.when(productService.viewAvailableProductsByCompanyId(companyId)).thenReturn(products);

        ResponseEntity<?> response = productController.viewAllProductsByAvailabilityAndCompanyId(companyId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(products, response.getBody());
    }
	
	
	@Test
    public void testingSetProductAvailability() throws ProductNotFoundException {
        String productId = "PP5678";
        ResponseEntity<?> expectedResponse = new ResponseEntity<>("Product with ID:"+productId+" is made available", HttpStatus.OK);

        when(productService.setProductAvailableByProductId(productId)).thenReturn(product);

        ResponseEntity<?> response = productController.setProductAvailability(productId);

        assertEquals(expectedResponse, response);
    }
	
	
	@Test
    public void testingGetProductsByLocationName() throws LocationNotFoundException {
        String locationName = "New York";
        List<Product> products = new ArrayList<>();
        Mockito.when(productService.getProductsByLocationName(locationName)).thenReturn(products);

        ResponseEntity<?> response = productController.getProductsByLocationName(locationName);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(products, response.getBody());
    }
	
	
	
	@Test
    public void testingSetProductAvailability_ProductNotFoundException() throws ProductNotFoundException {
        String productId = "PP5678";
        String errorMessage = "Product not found";
        Mockito.doThrow(new ProductNotFoundException(errorMessage)).when(productService).setProductAvailableByProductId(productId);

        ResponseEntity<?> response = productController.setProductAvailability(productId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(errorMessage, response.getBody());
    }
	
}
