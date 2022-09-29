package com.webpom.moments.entity;

import lombok.Data;

@Data
public class R {
    private Integer code;
    private String msg;
    private Object data;

    private R(){}

    private R(Integer code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }



    public static R ok(String msg, Object data){
        return new R(200,msg,data);
    }
    public static R ok(Object data){
        return new R(200,null,data);
    }

    public static R ok(String msg){
        return new R(200,msg,null);
    }

    public static R ok(){
        return new R(200,"成功",null);
    }

    public static R error(String msg){
        return new R(400,msg,null);
    }
}
