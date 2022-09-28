package com.webpom.moments.entity;

import lombok.Data;

@Data
public class Comment {
    private Integer id;
    private Integer momentsId;
    private String content;
    private Integer userId;
    private boolean isMy;
}
