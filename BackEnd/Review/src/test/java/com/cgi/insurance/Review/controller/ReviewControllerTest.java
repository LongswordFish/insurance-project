package com.cgi.insurance.Review.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.cgi.insurance.Review.model.Review;
import com.cgi.insurance.Review.service.ReviewService;

@ExtendWith(MockitoExtension.class)
public class ReviewControllerTest {

	 private MockMvc mockMvc;
	    @Mock
	    ReviewService revServ;
	    @InjectMocks
	    private ReviewController revCont;

	    private Review review;
	    private List<Review> revList;
	    
	    @BeforeEach
	    public void setUp() {
	        MockitoAnnotations.initMocks(this);
	        mockMvc = MockMvcBuilders.standaloneSetup(revCont).build();
	        review = new Review();
	        review.setReviewId("641b1b5ce4eb7f01f585f853");
			review.setCompanyId("comp3");
			review.setCustomerId("cust2");
			review.setProductId("prod1");
			review.setReviewCreated_date(null);
			review.setReviewTitle("Good company");
			review.setRating(3);
			review.setFeedback("will use again");
	        revList = new ArrayList<>();
	        revList.add(review);
	    }
	    
	    @AfterEach
	    public void tearDown() {
	        review = null;
	    }
	    
	    @Test
	    public void givenReviewToSaveThenShouldReturnSavedReview() throws Exception {
	        when(revServ.addReview(any())).thenReturn(review);
	        mockMvc.perform(post("/review/add")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(asJsonString(review)))
	                .andExpect(status().isCreated())
	                .andDo(MockMvcResultHandlers.print());
	        verify(revServ).addReview(any());
	    }
	    
	    @Test
	    public void givenGetAllReviewsThenShouldReturnListOfAllReviews() throws Exception {
	        when(revServ.getAllReviews()).thenReturn(revList);
	        mockMvc.perform(MockMvcRequestBuilders.get("/review/view")
	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(review)))
	                .andDo(MockMvcResultHandlers.print());
	        verify(revServ).getAllReviews();
	        verify(revServ, times(1)).getAllReviews();

	    }
	    
	    @Test
	    void givenReviewIdThenShouldReturnRespectiveReview() throws Exception {
	        when(revServ.getReviewById(review.getReviewId())).thenReturn(review);
	        mockMvc.perform(get("/review/view/641b1b5ce4eb7f01f585f853"))
	                .andExpect(MockMvcResultMatchers.status()
	                        .isOk())
	                .andDo(MockMvcResultHandlers.print());

	    }
	    
	    @Test
	    void givenProductIdThenShouldReturnRespectiveListOfReviews() throws Exception {
	    	when(revServ.getReviewByProduct(review.getProductId())).thenReturn(revList);
	        mockMvc.perform(MockMvcRequestBuilders.get("/review/view/product/prod1")
	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(review)))
	        		.andExpect(MockMvcResultMatchers.status()
	                        .isOk())
	                .andDo(MockMvcResultHandlers.print());
	        verify(revServ).getReviewByProduct("prod1");
	        verify(revServ, times(1)).getReviewByProduct("prod1");

	    }
	    
	    @Test
	    void givenCompanyIdThenShouldReturnRespectiveListOfReviews() throws Exception {
	    	when(revServ.getReviewByCompany(review.getCompanyId())).thenReturn(revList);
	        mockMvc.perform(MockMvcRequestBuilders.get("/review/view/company/comp3")
	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(review)))
	        		.andExpect(MockMvcResultMatchers.status()
	                        .isOk())
	                .andDo(MockMvcResultHandlers.print());
	    }
	    
	    @Test
	    void givenCustomerIdThenShouldReturnRespectiveListOfReviews() throws Exception {
	    	when(revServ.getReviewByCustomer(review.getCustomerId())).thenReturn(revList);
	        mockMvc.perform(MockMvcRequestBuilders.get("/review/view/customer/cust2")
	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(review)))
	        		.andExpect(MockMvcResultMatchers.status()
	                        .isOk())
	                .andDo(MockMvcResultHandlers.print());
	    }
	    
	    @Test
	    public void givenReviewIdToDeleteThenShouldReturnDeletedReview() throws Exception {
	        when(revServ.deleteReview(review.getReviewId())).thenReturn(review);
	        mockMvc.perform(delete("/review/delete/641b1b5ce4eb7f01f585f853")
	                .contentType(MediaType.APPLICATION_JSON)
	                .content(asJsonString(review)))
	                .andExpect(MockMvcResultMatchers.status().isOk()).andDo(MockMvcResultHandlers.print());
	    }
	    
	    @Test
	    public void givenReviewToUpdateThenShouldReturnUpdatedReview() throws Exception {
	        when(revServ.updateReview(any())).thenReturn(review);
	        mockMvc.perform(put("/review/update").contentType(MediaType.APPLICATION_JSON).content(asJsonString(review)))
	                .andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
	    }
	    
	    
	    public static String asJsonString(final Object obj) {
	        try {
	            return new ObjectMapper().writeValueAsString(obj);
	        } catch (Exception e) {
	            throw new RuntimeException(e);
	        }
	    }
	    
	    @Test
	    void givenCustomerIdAndProductIdThenShouldReturnRespectiveListOfReviews() throws Exception {
	    	when(revServ.getReviewByCustomerAndProduct(review.getCustomerId(),review.getProductId())).thenReturn(revList);
	        mockMvc.perform(MockMvcRequestBuilders.get("/review/view/customer/cust2/product/prod1")
	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(review)))
	        		.andExpect(MockMvcResultMatchers.status()
	                        .isOk())
	                .andDo(MockMvcResultHandlers.print());
	    }
	    
	    @Test
	    void givenCustomerIdAndCompanyIdThenShouldReturnRespectiveListOfReviews() throws Exception {
	    	when(revServ.getReviewByCustomerAndCompany(review.getCustomerId(),review.getCompanyId())).thenReturn(revList);
	        mockMvc.perform(MockMvcRequestBuilders.get("/review/view/customer/cust2/company/comp3")
	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(review)))
	        		.andExpect(MockMvcResultMatchers.status()
	                        .isOk())
	                .andDo(MockMvcResultHandlers.print());
	    }
	    
	    @Test
	    void givenProductIdAndCompanyIdThenShouldReturnRespectiveListOfReviews() throws Exception {
	    	when(revServ.getReviewByProductAndCompany(review.getProductId(),review.getCompanyId())).thenReturn(revList);
	        mockMvc.perform(MockMvcRequestBuilders.get("/review/view/product/prod1/company/comp3")
	                .contentType(MediaType.APPLICATION_JSON).content(asJsonString(review)))
	        		.andExpect(MockMvcResultMatchers.status()
	                        .isOk())
	                .andDo(MockMvcResultHandlers.print());
	    }
}
