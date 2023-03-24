FROM openjdk:17-alpine
WORKDIR usr/src
ADD /target/product_purchased_service-0.0.1-SNAPSHOT.jar /usr/src/product_purchased_service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","product_purchased_service-0.0.1-SNAPSHOT.jar"]
ENV MONGOURL=mongodb://mongos:27017/insurance
ENV EUREKAURL=http://eurekaservice:8761/eureka
# EXPOSE 9094  
