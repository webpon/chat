package com.webpom.moments.controller;

import com.auth0.jwt.interfaces.Claim;
import com.webpom.moments.entity.Comment;
import com.webpom.moments.entity.R;
import com.webpom.moments.service.CommentService;
import com.webpom.moments.utils.JWTUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Resource
    private CommentService commentService;

    @PostMapping
    public R save(@RequestBody Comment comment,
                  @RequestHeader("Authorization") String token){
        Claim id = JWTUtils.getToken(token).getClaim("id");
        return commentService.save(comment, id.asString());
    }

    @DeleteMapping
    public R delete(@RequestBody Comment comment,
                  @RequestHeader("Authorization") String token) {
        Claim id = JWTUtils.getToken(token).getClaim("id");
        return commentService.deleteByIdAndUserId(comment, id.asString());
    }
}
