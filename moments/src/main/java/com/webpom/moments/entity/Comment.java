package com.webpom.moments.entity;

import lombok.Data;
import lombok.Setter;

import java.util.List;

@Setter
@Data
public class Comment {
    private Integer id;
    private Integer replyId;
    private String content;
    private Integer momentsId;
    private String  userId;
    private boolean isMy;
    private boolean isAdmin;
    private String time;
    private List<Comment> children;
}
