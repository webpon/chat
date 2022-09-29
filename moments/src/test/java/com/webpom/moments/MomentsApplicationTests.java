package com.webpom.moments;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.webpom.moments.utils.JWTUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MomentsApplicationTests {

    @Test
    void contextLoads() {
        DecodedJWT token = JWTUtils.getToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzA0ZjI2ZWEzNjQzZDdhMTJmMjg2YSIsImlhdCI6MTY2NDM1MTUzNiwiZXhwIjoxNjY0NDM3OTM2fQ.ulhK9eBnxyqYQhaokdORzmMtcF8k1rxrP8AeZBwwf3k");
        String id = token.getClaim("id").asString();
        System.out.println(id);
    }

}
