FROM openjdk:17-alpine
WORKDIR usr/src
ENV MONGOURL=mongodb://mongos:27017/insurance
ADD /target/product_purchased_service-0.0.1-SNAPSHOT.jar /usr/src/product_purchased_service-0.0.1-SNAPSHOT.jar
 
EXPOSE 9094  
ENTRYPOINT ["java","-jar","product_purchased_service-0.0.1-SNAPSHOT.jar"]