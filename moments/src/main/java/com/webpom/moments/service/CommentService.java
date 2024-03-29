package com.webpom.moments.service;

import com.webpom.moments.entity.Comment;
import com.webpom.moments.entity.R;

import java.util.List;

public interface CommentService {
    List<Comment> queryByMomentsId(Integer MomentsId, String userId);

    R save(Comment comment, String token);

    boolean deleteByMomentsId(Integer id);

    R deleteByIdAndUserId(Comment comment, String userId);
}
