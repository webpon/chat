package com.webpom.moments.controller;

import com.auth0.jwt.interfaces.Claim;
import com.webpom.moments.entity.Moments;
import com.webpom.moments.entity.R;
import com.webpom.moments.service.MomentsService;
import com.webpom.moments.utils.JWTUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/moments")
public class MomentsController {

    @Resource
    private MomentsService momentsService;

    @PostMapping
    public R save(@RequestBody Moments moments,
            @RequestHeader("Authorization") String token) {
        Claim id = JWTUtils.getToken(token).getClaim("id");
        return momentsService.save(moments, id.asString());
    }

    @GetMapping("/{p}")
    public R query(@PathVariable(required = false) Integer p,
                   @RequestHeader("Authorization") String token){
        Claim id = JWTUtils.getToken(token).getClaim("id");
        return momentsService.query(p, id.asString());
    }

}
