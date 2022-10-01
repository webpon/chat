package com.webpom.moments.service;

import com.webpom.moments.entity.Like;
import com.webpom.moments.entity.R;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LikeService {
    List<Like> queryByMomentsId(Integer id);

    R likeMoments(Like like, String id);

    void deleteByMomentsId(@Param("id") Integer id);

    Like queryByMomentsIdAndUserId(Integer id, String userId);
}
