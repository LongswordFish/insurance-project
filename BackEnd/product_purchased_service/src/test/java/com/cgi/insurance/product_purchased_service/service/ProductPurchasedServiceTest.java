package com.cgi.insurance.product_purchased_service.service;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.cgi.insurance.product_purchased_service.exception.PPIdAlreadyExistsException;
import com.cgi.insurance.product_purchased_service.exception.PPIdNotExistsException;
import com.cgi.insurance.product_purchased_service.model.ProductPurchased;
import com.cgi.insurance.product_purchased_service.repository.ProductPurchasedRepository;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductPurchasedServiceTest {
    @Mock
    private ProductPurchasedRepository ppRepo;

    @InjectMocks
    private ProductPurchasedServiceImpl ppService;
    private ProductPurchased pp1;
    private List<ProductPurchased> ppList;
    private Optional optional;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        pp1 = new ProductPurchased("ppId1","product1","comp1","clien1",null,null,11.11,"toronto","","","");
        optional = Optional.of(pp1);
    }

    @AfterEach
    public void tearDown() {
        pp1 = null;
    }

    @Test
    public void givenProductPurchasedToSaveThenShouldReturnSavedProductPurchased() throws PPIdAlreadyExistsException {
        when(ppRepo.save(any())).thenReturn(pp1);
        assertEquals(pp1, ppService.addProductPurchased(pp1));
        verify(ppRepo, times(1)).save(any());
    }

    @Test
    public void givenProductPurchasedToSaveThenShouldNotReturnSavedProductPurchased() {
        when(ppRepo.save(any())).thenThrow(new RuntimeException());
        Assertions.assertThrows(RuntimeException.class,() -> {
            ppService.addProductPurchased(pp1);
        });
        verify(ppRepo, times(1)).save(any());
    }

    @Test
    public void givenGetAllProductPurchasedsThenShouldReturnListOfAllProductPurchaseds() {
        ppRepo.save(pp1);
        //stubbing the mock to return specific data
        when(ppRepo.findAll()).thenReturn(ppList);
        List<ProductPurchased> ppList1 = ppService.getAllProductPurchased();
        assertEquals(ppList, ppList1);
        verify(ppRepo, times(1)).save(pp1);
        verify(ppRepo, times(1)).findAll();
    }

    @Test
    public void givenProductPurchasedIdThenShouldReturnRespectiveProductPurchased() {
        when(ppRepo.findById(any())).thenReturn(Optional.of(pp1));
        ProductPurchased retrievedProductPurchased = ppService.getProductPurchasedByPPId(pp1.getPpId());
        verify(ppRepo, times(1)).findById(anyString());

    }

    @Test
    void givenProductPurchasedIdToDeleteThenShouldReturnDeletedProductPurchased() throws PPIdNotExistsException {
        when(ppRepo.findById(pp1.getPpId())).thenReturn(optional);
        ppService.deleteProdcutPurchased("ppId1");


        verify(ppRepo, times(1)).findById(pp1.getPpId());
        verify(ppRepo, times(1)).deleteById(pp1.getPpId());
    }

    @Test
    void givenProductPurchasedIdToDeleteThenShouldNotReturnDeletedProductPurchased() throws PPIdNotExistsException {
        when(ppRepo.findById(pp1.getPpId())).thenReturn(Optional.empty());
        Assertions.assertThrows(PPIdNotExistsException.class,() -> {
            ppService.deleteProdcutPurchased("ppId1");
        });
    }

    @Test
    public void givenProductPurchasedToUpdateThenShouldReturnUpdatedProductPurchased() throws PPIdNotExistsException {
        when(ppRepo.findById(pp1.getPpId())).thenReturn(optional);
        when(ppRepo.save(pp1)).thenReturn(pp1);
        pp1.setLocation("BC");
        ProductPurchased pp2 = ppService.updateProductPurchased(pp1);
        assertEquals(pp2.getLocation(), "BC");
        verify(ppRepo, times(1)).save(pp1);
        verify(ppRepo, times(1)).findById(pp1.getPpId());
    }

    @Test
    public void givenProductPurchasedToUpdateThenShouldNotReturnUpdatedProductPurchased() throws PPIdNotExistsException {
        when(ppRepo.findById(pp1.getPpId())).thenReturn(Optional.empty());
        Assertions.assertThrows(PPIdNotExistsException.class,() -> {
            ppService.updateProductPurchased(pp1);
        });

    }
}
