FROM maven:3-openjdk-11 as builder

COPY . /src

WORKDIR /src

RUN mvn clean package

FROM openjdk:11
COPY --from=builder /src/target/mywatchlist-*.jar /opt/mywatchlist.jar

ENTRYPOINT ["java", "-jar", "/opt/mywatchlist.jar"]
