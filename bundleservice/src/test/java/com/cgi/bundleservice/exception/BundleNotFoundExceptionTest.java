package com.cgi.bundleservice.exception;

import org.junit.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

public class BundleNotFoundExceptionTest {
	
	@Test(expected = BundleNotFoundException.class)
    public void testBundleNotFoundException() {
        throw new BundleNotFoundException("Test message");
    }

	 @Test
	    public void testBundleNotFoundExceptionMessage() {
	        String message = "Test message";
	        BundleNotFoundException exception = mock(BundleNotFoundException.class);
	        Mockito.when(exception.getMessage()).thenReturn(message);
	        assertEquals(message, exception.getMessage());
	    }

}
