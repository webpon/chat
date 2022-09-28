package com.webpom.moments.entity;

import lombok.Data;

@Data
public class Collect {
    private Moments moments;
    private Comment comment;
    private Boolean isLike;
}
