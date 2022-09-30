package com.webpom.moments.interceptor;


import com.alibaba.fastjson.JSON;
import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webpom.moments.entity.R;
import com.webpom.moments.utils.JWTUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * JWT验证拦截器
 */
public class JWTInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        R r = null;
        //令牌建议是放在请求头中，获取请求头中令牌
        response.addHeader("Access-Allow-Control-Origin","*");
        String token = request.getHeader("Authorization");
        if (token != null) {
            try {
                JWTUtils.verify(token);//验证令牌
                return true;//放行请求
            } catch (SignatureVerificationException e) {
                r = R.error("无效签名");
            } catch (TokenExpiredException e) {
                r = R.error("token过期");
            } catch (AlgorithmMismatchException e) {
                r = R.error("token算法不一致");
            } catch (Exception e) {
                r = R.error("token失效");
            }
        }else {
            r = R.error("请登录");
        }
        //将map转化成json，response使用的是Jackson
        String json = JSON.toJSONString(r);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().print(json);
        return false;
    }
}