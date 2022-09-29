package com.webpom.moments.entity;

import lombok.Data;

import java.util.List;

@Data
public class Comment {
    private Integer id;
    private Integer replyId;
    private String content;
    private Integer momentsId;
    private String  userId;
    private boolean isMy;
    private String time;
    private List<Comment> children;
}
