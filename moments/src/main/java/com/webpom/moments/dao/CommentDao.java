package com.webpom.moments.dao;

import com.webpom.moments.entity.Comment;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommentDao {
    List<Comment> queryByMomentsId(@Param("momentsId") Integer momentsId);

    boolean save(Comment comment);

    boolean deleteByMomentsId(@Param("id") Integer id);

    Comment queryById(@Param("id") Integer id);

    boolean deleteById(@Param("id") Integer id);
}
