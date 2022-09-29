package com.webpom.moments.dao;

import com.webpom.moments.entity.Like;

import java.util.List;

public interface LikeDao {
    List<Like> queryByMomentsId(Integer momentsId);

    boolean save(Like like);

    boolean delete(Like like);

    Like queryByUserIdAndMomentsId(Like like);
}
