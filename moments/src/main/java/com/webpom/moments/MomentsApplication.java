package com.webpom.moments;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.webpom.moments.dao")
public class MomentsApplication {

    public static void main(String[] args) {
        SpringApplication.run(MomentsApplication.class, args);
    }

}
