package com.webpom.moments.entity;

import lombok.Data;

import java.util.List;

@Data
public class Moments {
    private Integer id;
    private String content;
    private List<Image> images;
    private Integer userId;
    private boolean isMy;
}
