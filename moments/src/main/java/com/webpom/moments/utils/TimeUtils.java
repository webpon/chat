package com.webpom.moments.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtils {
    private final static long YEAR = 1000 * 60 * 60 * 24 * 365L;
    private final static long MONTH = 1000 * 60 * 60 * 24 * 30L;
    private final static long DAY = 1000 * 60 * 60 * 24L;
    private final static long HOUR = 1000 * 60 * 60L;
    private final static long MINUTE = 1000 * 60L;

    /**
     * 日期转换成字符串
     * @param date
     * @return str
     */
    public static String dateToStr(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String str = format.format(date);
        return str;
    }

    /**
     * 字符串转换成日期
     * @param str
     * @return date
     */
    public static Date strToDate(String str) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
            date = format.parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 根据时间查询时间属于哪个时刻
     * @param date
     * @return
     */
    public static String natureTime(Date date){
        Date now = new Date();
        long between = now.getTime() - date.getTime();
        if (between > YEAR){
            return ((between - YEAR) / YEAR + 1) + "年前 ";
        }
        if (between > MONTH){
            return ((between - MONTH) / MONTH + 1) + "月前 ";
        }
        if (between > DAY){
            return ((between - DAY) / DAY + 1) + "天前 ";
        }
        if (between > HOUR){
            return ((between - HOUR) / HOUR + 1) + "小时前 ";
        }
        if (between > MINUTE){
            return ((between - MINUTE) / MINUTE + 1) + "分钟前 ";
        }
        return "刚刚";
    }

}
