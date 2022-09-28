package com.webpom.moments.entity;

import lombok.Data;

@Data
public class Image {
    private Integer id;
    private Integer type;
    private Integer momentsId;
    private String url;
}
