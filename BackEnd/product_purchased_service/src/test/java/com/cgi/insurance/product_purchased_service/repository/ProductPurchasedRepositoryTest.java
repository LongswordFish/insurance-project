package com.cgi.insurance.product_purchased_service.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;
import com.cgi.insurance.product_purchased_service.model.ProductPurchased;

@SpringBootTest
public class ProductPurchasedRepositoryTest {
    @Autowired
    private ProductPurchasedRepository ppRepo;
    private ProductPurchased productPurchased;
    private List<ProductPurchased> ppList;
    @BeforeEach
    public void setUp() {
        productPurchased = new ProductPurchased();
        
        productPurchased.setProductId("product1");
        productPurchased.setClientId("client1");
        productPurchased.setClientId("company1");
        productPurchased.setLocation("toronto");
        productPurchased.setQuotePrice(11.11);

        ppList = new ArrayList<>();
    }
    @AfterEach
    public void tearDown() {
        productPurchased = null;
        ppList=null;
    }

    @Test
    public void givenProductPurchasedToSaveThenShouldReturnSavedProductPurchased() {
        ProductPurchased savedPP = ppRepo.save(productPurchased);
        ProductPurchased fetchedProductPurchased = ppRepo.findById(savedPP.getPpId()).get();
        assertEquals(savedPP.getPpId(), fetchedProductPurchased.getPpId());
    }


    @Test
    public void givenGetAllProductPurchasedsThenShouldReturnListOfAllProductPurchaseds() {
        ProductPurchased pp1 = new ProductPurchased(null,"product1","comp1","clien1",null,null,11.11,"toronto");
        ProductPurchased pp2 = new ProductPurchased(null,"product1","comp1","clien1",null,null,22.22,"quebec");
        ppRepo.save(pp1);
        ppRepo.save(pp2);

        List<ProductPurchased> productPurchasedList = (List<ProductPurchased>) ppRepo.findAll();
        assertEquals("clien1", productPurchasedList.get(1).getClientId());
    }

    @Test
    public void givenProductPurchasedIdThenShouldReturnRespectiveProductPurchased() {
        ProductPurchased pp1 = new ProductPurchased(null,"product1","comp1","clien1",null,null,11.11,"toronto");
        ProductPurchased pp2 = new ProductPurchased(null,"product1","comp1","clien1",null,null,22.22,"quebec");
        
        ProductPurchased savedPP1 = ppRepo.save(pp1);
        ProductPurchased savedPP2 = ppRepo.save(pp2);
        Optional<ProductPurchased> optional = ppRepo.findById(savedPP1.getPpId());
        assertEquals(savedPP1.getClientId(), optional.get().getClientId());
        assertEquals(savedPP1.getCompanyId(), optional.get().getCompanyId());
        assertEquals(savedPP1.getProductId(), optional.get().getProductId());
        assertEquals(savedPP1.getLocation(), optional.get().getLocation());
    }

    @Test
    public void givenProductPurchasedIdToDeleteThenShouldReturnDeletedProductPurchased() {
        ProductPurchased pp1 = new ProductPurchased(null,"product1","comp1","clien1",null,null,11.11,"toronto");
        ProductPurchased savedPP1 = ppRepo.save(pp1);
        ppRepo.deleteById(savedPP1.getPpId());
        Optional optional = ppRepo.findById(savedPP1.getPpId());
        assertEquals(Optional.empty(), optional);
    }
}
