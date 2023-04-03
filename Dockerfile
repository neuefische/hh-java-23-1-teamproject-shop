FROM openjdk:19

ENV ENVIRONMENT=prod

EXPOSE 8080

ADD backend/target/shop-app.jar shop-app.jar

CMD ["sh", "-c", "java -jar /shop-app.jar"]
