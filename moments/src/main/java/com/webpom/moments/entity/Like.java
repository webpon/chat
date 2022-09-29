package com.webpom.moments.entity;
import lombok.Data;

@Data
public class Like {
    private Integer id;
    private Integer momentsId;
    private String userId;
    private String time;
}
