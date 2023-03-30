package com.cgi.productMicroservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.cgi.productMicroservice.exception.LocationNotFoundException;
import com.cgi.productMicroservice.exception.ProductNotFoundException;
import com.cgi.productMicroservice.model.Location;
import com.cgi.productMicroservice.model.Product;
import com.cgi.productMicroservice.repository.ProductRepository;

public class ProductServiceTest {
	
	@InjectMocks
	ProductServiceImpl productService;
	
	@Mock
	ProductRepository productRepo;
	
	Product product;
	
	@BeforeEach
	public void setup()
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
	public void testingCreateProduct() {

		//stubbing
		Mockito.when(productRepo.save(product)).thenReturn(product);
		
		Product result = productService.createProduct(product);
		
		assertEquals(result.getName(),"Home insurance");
		
		verify(productRepo,times(1)).save(product);

	}
	
	
	@Test
	public void testingUpdateProduct() throws ProductNotFoundException {
	    String productId = "123";
	    
	    Product existingProduct;
	    existingProduct=new Product();
	    existingProduct.setProductId(productId);
	    existingProduct.setAvailable(true);
	    existingProduct.setCategory("home");
	    existingProduct.setCompanyId("CMP123");
	    existingProduct.setDescription("test");
	    existingProduct.setLocations(null);
	    existingProduct.setName("Home insurance");
	    existingProduct.setPicture("product.jpg");
	    existingProduct.setPrice(100);
		
	    Product updatedProduct;
	    updatedProduct=new Product();
	    updatedProduct.setProductId(productId);
	    updatedProduct.setAvailable(false);
	    updatedProduct.setCategory("home");
	    updatedProduct.setCompanyId("CMP123");
	    updatedProduct.setDescription("test");
	    updatedProduct.setLocations(null);
	    updatedProduct.setName("Home insurance - Basic"); //updating the name
	    updatedProduct.setPicture("product.jpg");
	    updatedProduct.setPrice(100);
	    
	    when(productRepo.findById(productId)).thenReturn(Optional.of(existingProduct));
	    when(productRepo.save(updatedProduct)).thenReturn(updatedProduct);

	    Product result = productService.updateProduct(productId, updatedProduct);

	    verify(productRepo, times(1)).findById(productId);
	    verify(productRepo, times(1)).save(updatedProduct);
	    assertEquals(updatedProduct, result);
	}

	
	@Test
	public void testingDeleteProduct_Success() throws ProductNotFoundException {
		String productId = "123";
		
		Product existingProduct;
	    existingProduct=new Product();
	    existingProduct.setProductId(productId);
	    existingProduct.setAvailable(true);
	    existingProduct.setCategory("home");
	    existingProduct.setCompanyId("CMP123");
	    existingProduct.setDescription("test");
	    existingProduct.setLocations(null);
	    existingProduct.setName("Home insurance");
	    existingProduct.setPicture("product.jpg");
	    existingProduct.setPrice(100);
	    
		when(productRepo.findById(productId)).thenReturn(Optional.of(product));

		boolean result = productService.deleteProduct(productId);
		assertTrue(result);
		verify(productRepo, times(1)).deleteById(productId);
	}
	
	
	@Test
	public void testingDeleteProduct_Failure() {
		String productId = "123";
		when(productRepo.findById(productId)).thenReturn(Optional.empty());
		
		assertThrows(ProductNotFoundException.class, () -> productService.deleteProduct(productId));
		verify(productRepo, never()).deleteById(productId);
	}

	
	@Test
    void testingGetAllProducts() {
        List<Product> expectedProducts = new ArrayList<>();
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
		
        expectedProducts.add(product1);
        expectedProducts.add(product2);

        when(productRepo.findAll()).thenReturn(expectedProducts);
        
        List<Product> actualProducts = productService.getAllProducts();

        // Assert
        assertEquals(expectedProducts.size(), actualProducts.size());

        verify(productRepo, times(1)).findAll();
    }
	
	
	@Test
    void testingGetProductByProductID() throws ProductNotFoundException {
        String productID = "123";
        Product expectedProduct =new Product();
        expectedProduct.setProductId("123");
        expectedProduct.setAvailable(true);
        expectedProduct.setCategory("home");
        expectedProduct.setCompanyId("CMP123");
        expectedProduct.setDescription("test");
        expectedProduct.setLocations(null);
        expectedProduct.setName("Home insurance");
		expectedProduct.setPicture("product.jpg");
		expectedProduct.setPrice(100);

        when(productRepo.findById(productID)).thenReturn(Optional.of(expectedProduct));

        Product actualProduct = productService.getProductByProductID(productID);

        assertNotNull(actualProduct);
        assertEquals(expectedProduct, actualProduct);

        verify(productRepo, times(1)).findById(productID);
    }
	
	
	@Test
    void testingGetAllProductsByCompanyID() {
        String companyId = "CMP123";
        List<Product> expectedProducts = new ArrayList<>();
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
		
        expectedProducts.add(product1);
        expectedProducts.add(product2);

        when(productRepo.findByCompanyId(companyId)).thenReturn(expectedProducts);

        List<Product> actualProducts = productService.getAllProductsByCompanyID(companyId);

        assertEquals(expectedProducts.size(), actualProducts.size());

        verify(productRepo, times(1)).findByCompanyId(companyId);
    }
	
	
	
	@Test
    void testingGetAllProductsByCategory() {
        String category = "home";
        List<Product> expectedProducts = new ArrayList<>();
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
		
        expectedProducts.add(product1);
        expectedProducts.add(product2);

        when(productRepo.findByCategory(category)).thenReturn(expectedProducts);

        List<Product> actualProducts = productService.getAllProductsByCategory(category);

        assertEquals(expectedProducts.size(), actualProducts.size());

        verify(productRepo, times(1)).findByCategory(category);
    }
	
	
	@Test
    void testingDeleteByCompanyId() {
        String companyId = "CMP123";

        productService.deleteByCompanyId(companyId);

        verify(productRepo, times(1)).deleteByCompanyId(companyId);
    }
	
	
	@Test
    void testingViewAvailableProducts() {
        List<Product> expectedProducts = new ArrayList<>();
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
		
        expectedProducts.add(product1);
        expectedProducts.add(product2);

        when(productRepo.findByIsAvailable(true)).thenReturn(expectedProducts);

        List<Product> actualProducts = productService.viewAvailableProducts();

        assertEquals(expectedProducts.size(), actualProducts.size());

        verify(productRepo, times(1)).findByIsAvailable(true);
    }
	
	
	@Test
	public void testingViewAvailableProductsByCompanyId() {
		List<Product> productList = new ArrayList<>();
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
		
		productList.add(product1);
		productList.add(product2);
	    
	    when(productRepo.findByCompanyIdAndIsAvailable("CMP123", true)).thenReturn(productList.stream().filter(p -> p.getCompanyId().equals("CMP123") && p.isAvailable()).collect(Collectors.toList()));
	    
	    List<Product> expectedList = new ArrayList<>();
	    expectedList.add(product1);
	    expectedList.add(product2);
	    
	    List<Product> actualList = productService.viewAvailableProductsByCompanyId("CMP123");
	    
	    assertEquals(expectedList, actualList);
	}

	
	@Test
	public void testingSetProductAvailableByProductId() throws ProductNotFoundException {
	    
	    when(productRepo.findById("PP123")).thenReturn(Optional.of(product));
	    when(productRepo.save(product)).thenReturn(product);
	    
	    Product actualProduct = productService.setProductAvailableByProductId("PP123");
	    
	    assertTrue(actualProduct.isAvailable());
	}

	
	@Test
	public void testingGetProductsByLocationName() throws LocationNotFoundException {

	    // Create some sample products and locations
	    Location location1 = new Location();
	    location1.setLocationName("New York");
	    location1.setLocationPrice(100.9);
	    
	    Location location2 = new Location();
	    location2.setLocationName("Boston");
	    location2.setLocationPrice(150.9);
	    
	    List<Location> locations = new ArrayList<>();
	    locations.add(location1);
	    locations.add(location2);
	    
	    Product product3 =new Product();
		product3.setProductId("PP123");
		product3.setAvailable(true);
		product3.setCategory("home");
		product3.setCompanyId("CMP123");
		product3.setDescription("test");
		product3.setLocations(locations);
		product3.setName("Home insurance");
		product3.setPicture("product.jpg");
		product3.setPrice(100);
 
	    // Set up the mock repository to return the sample products list
	    when(productRepo.findByLocationsLocationName("New York")).thenReturn(Collections.singletonList(product3));
	    
	    // Test for valid location
	    List<Product> productsList1 = productService.getProductsByLocationName("New York");
	    assertEquals(1, productsList1.size());
	    assertEquals(product3, productsList1.get(0));
	    
	    // Test for invalid location
	    assertThrows(LocationNotFoundException.class, () -> productService.getProductsByLocationName("Invalid Location"));
	}

}
