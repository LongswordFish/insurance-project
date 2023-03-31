package com.cgi.insurance.claimservice.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import com.cgi.insurance.claimservice.constant.Constant;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.swagger.v3.oas.models.PathItem.HttpMethod;
import jakarta.servlet.FilterChain;
import jakarta.servlet.GenericFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class CompanyFilter extends GenericFilter{
	
	private String SECRET_KEY = Constant.SECRET_KEY;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest httprequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        httpResponse.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
        httpResponse.setHeader("Access-Control-Allow-Crendentials", "true");
        httpResponse.setHeader("Access-Control-Allow-Headers", "*");

        //preflight request
        if (httprequest.getMethod().equals(HttpMethod.OPTIONS.name())) {
            chain.doFilter(httprequest, httpResponse);
        } else {
        	String authheader = httprequest.getHeader("Authorization");
        	
        	if ((authheader == null) || (!authheader.startsWith("Bearer"))) {              
                
        		handleMissingToken(httpResponse,"JWT Token is missing");
                return;

            }
        	
        	String mytoken = authheader.substring(7);
            //System.out.println(mytoken);


            try {
                JwtParser jwtparser = Jwts.parser().setSigningKey(SECRET_KEY.getBytes());

                Jwt jwtobj = jwtparser.parse(mytoken);

                Claims claim = (Claims) jwtobj.getBody();
                String role = (String)claim.get("role");
                
                //System.out.println("role is "+role);
                if(role==null || !(role.equals("company")||role.equals("admin"))){
                    handleMissingToken(httpResponse,"You don't have access");
                    return;
                }

            } catch (SignatureException sign) {
                
                handleMissingToken(httpResponse,"Signature Mismatch");
                return;

            }
            catch (MalformedJwtException malforn) {
 
                handleMissingToken(httpResponse,"Malformed Token");
                return;
            }
        }

        chain.doFilter(httprequest, httpResponse);

        
		
	}
	
	private void handleMissingToken(HttpServletResponse httpResponse, String message) throws IOException {
        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("message", message);

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String json = objectMapper.writeValueAsString(errorDetails);
            PrintWriter out = httpResponse.getWriter();
            out.print(json);
            httpResponse.setStatus(HttpStatus.FORBIDDEN.value());
            httpResponse.setContentType("application/json");
            httpResponse.setCharacterEncoding("UTF-8");
            out.flush();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
      }


}
