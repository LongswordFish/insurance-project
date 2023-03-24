FROM openjdk:17-alpine
WORKDIR usr/src
ADD /target/eureka_server-0.0.1-SNAPSHOT.jar /usr/src/eureka_server-0.0.1-SNAPSHOT.jar
# EXPOSE 8761
ENTRYPOINT ["java","-jar","eureka_server-0.0.1-SNAPSHOT.jar"]
