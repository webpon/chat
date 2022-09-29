package com.webpom.moments.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Collect {
    private Moments moments;
    private List<Comment> comments;
    private List<Like> likes;
    private Boolean isMyLike;
}
