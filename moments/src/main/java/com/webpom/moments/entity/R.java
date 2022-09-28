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



    public static R ok(Integer code, String msg, Object data){
        return new R(code,msg,data);
    }

    public static R ok(Integer code, String msg){
        return new R(code,msg,null);
    }

    public static R ok(){
        return new R(200,"成功",null);
    }

    public static R error(Integer code, String msg){
        return new R(code,msg,null);
    }
}
