package com.cgi.insurance.Review.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;

import static org.hamcrest.CoreMatchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.cgi.insurance.Review.exceptions.ReviewIdDoesNotExistException;
import com.cgi.insurance.Review.model.Review;
import com.cgi.insurance.Review.repository.ReviewRepository;

public class ReviewServiceTest {
	
	@InjectMocks
	ReviewServiceImpl revServ;
	
	@Mock
	ReviewRepository revRepo;
	
	Review review;
	Review review1;
	private Optional optional;
	
	List<Review> reviews=new ArrayList<Review>();
	
	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
		review=new Review();
		review.setReviewId("641b1b5ce4eb7f01f585f853");
		review.setCompanyId("comp3");
		review.setCustomerId("cust2");
		review.setProductId("prod1");
		review.setReviewCreated_date(null);
		review.setReviewTitle("Good company");
		review.setRating(3);
		review.setFeedback("will use again");
		
		review1 = new Review();
		review1.setReviewId("641b1b5ce4eb7f01f585f852");
		review1.setCompanyId("comp3");
		review1.setCustomerId("cust2");
		review1.setProductId("prod1");
		review1.setReviewCreated_date(null);
		review1.setReviewTitle("Good company 2");
		review1.setRating(3);
		review1.setFeedback("will use again");

		optional = Optional.of(review);
	}
	
	@AfterEach
    public void tearDown() {
        review = null;
    }
	
	@Test
	public void whenReviewAddedSuccess()
	{
		//stubbing
		Mockito.when(revRepo.save(review)).thenReturn(review);
		Review revResult=revServ.addReview(review);
		assertEquals(revResult.getCompanyId(),"comp3");
		verify(revRepo,times(1)).save(review);
	}
	
	@Test
    public void givenBlogToSaveThenShouldNotReturnSavedBlog() {
        Mockito.when(revRepo.save(review)).thenThrow(new RuntimeException());
        Assertions.assertThrows(RuntimeException.class,() -> {
        	revServ.addReview(review);
        });
        verify(revRepo, times(1)).save(review);
    }
	
	@Test
	public void whenGetAllReviewsViewAllReviewList()
	{
		Mockito.when(revRepo.findAll()).thenReturn(reviews);
		List<Review> reviewlist=revServ.getAllReviews();
		assertEquals(reviewlist,reviews);	
	}
	
	@Test
    public void whenReviewIdThenShouldReturnRespectiveReview() throws ReviewIdDoesNotExistException {
		Mockito.when(revRepo.findById(review.getReviewId())).thenReturn(Optional.of(review));
        Review retrievedReview = revServ.getReviewById(review.getReviewId());
        verify(revRepo, times(1)).findById(review.getReviewId());
    }
	
	@Test
	public void givenReviewIdToDeleteThenShouldReturnDeletedReview() throws ReviewIdDoesNotExistException {
	    when(revRepo.findById(review.getReviewId())).thenReturn(optional);
	    Review deletedReview = revServ.deleteReview(review.getReviewId());
	    assertEquals(review.getReviewId(), deletedReview.getReviewId());
	    verify(revRepo, times(1)).findById(review.getReviewId());
	    verify(revRepo, times(1)).deleteById(review.getReviewId());
	}
	
	
	@Test
    public void givenReviewToUpdateThenShouldReturnUpdatedReview() throws ReviewIdDoesNotExistException {
        when(revRepo.findById(review.getReviewId())).thenReturn(optional);
        when(revRepo.save(review)).thenReturn(review);
        review.setReviewTitle("Good company");
        Review review1 = revServ.updateReview(review);
        assertEquals(review1.getReviewTitle(), "Good company");
        verify(revRepo, times(1)).save(review);
        verify(revRepo, times(1)).findById(review.getReviewId());
    }

	
	
}
