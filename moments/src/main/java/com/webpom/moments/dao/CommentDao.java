package com.webpom.moments.dao;

import com.webpom.moments.entity.Comment;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommentDao {
    List<Comment> queryByMomentsId(@Param("momentsId") Integer momentsId);

    boolean save(Comment comment);

}
