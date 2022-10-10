package com.webpom.moments.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Admin {
    @Value("${com.webpom.adminList}")
    public String[] admins;

    public boolean  isAdmin(String userId){
        for (String admin : admins) {
            if (admin.equals(userId)) {
                return true;
            }
        }
        return false;
    }
}
