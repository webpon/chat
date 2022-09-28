package com.webpom.moments.controller;

import com.webpom.moments.entity.Moments;
import com.webpom.moments.entity.R;
import com.webpom.moments.service.MomentsService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/moments")
public class MomentsController {

    @Resource
    private MomentsService momentsService;

    @PostMapping
    public R save(@RequestBody Moments moments,
            @RequestHeader("token") String token) {
        
        return R.ok();
    }

}
