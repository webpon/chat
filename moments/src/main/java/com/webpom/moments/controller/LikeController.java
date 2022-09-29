package com.webpom.moments.controller;

import com.auth0.jwt.interfaces.Claim;
import com.webpom.moments.entity.Comment;
import com.webpom.moments.entity.Like;
import com.webpom.moments.entity.R;
import com.webpom.moments.service.CommentService;
import com.webpom.moments.service.LikeService;
import com.webpom.moments.utils.JWTUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/like")
public class LikeController {

    @Resource
    private LikeService likeService;

    @PostMapping
    public R likeMoments(@RequestBody Like like,
                         @RequestHeader String token){
        Claim id = JWTUtils.getToken(token).getClaim("id");
        return likeService.likeMoments(like, id.asString());
    }
}
