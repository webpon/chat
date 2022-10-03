package com.webpom.moments.utils;

public class Admin {
    public static final String[] admins = new String[]{"6330340b40859ace2d37ee4d","63304f26ea3643d7a12f286a"};

    public static boolean  isAdmin(String userId){
        for (String admin : admins) {
            if (admin.equals(userId)) {
                return true;
            }
        }
        return false;
    }
}
