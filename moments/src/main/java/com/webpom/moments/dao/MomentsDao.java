package com.webpom.moments.dao;

import com.webpom.moments.entity.Moments;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

import java.util.List;

@Mapper
public interface MomentsDao {

    @Options(useGeneratedKeys = true, keyProperty = "id")
    boolean save(Moments moments);

    List<Moments> query(Integer size);
}
