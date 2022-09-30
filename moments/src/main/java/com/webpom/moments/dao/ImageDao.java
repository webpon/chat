package com.webpom.moments.dao;

import com.webpom.moments.entity.Image;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ImageDao {
    @Options(useGeneratedKeys = true, keyProperty = "id")
    boolean saveList(@Param("images") List<Image> images);

    List<Image> queryByMomentsId(Integer id);

    void deleteByMomentsId(@Param("id") Integer id);
}
