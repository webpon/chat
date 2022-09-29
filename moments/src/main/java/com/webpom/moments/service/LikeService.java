package com.webpom.moments.service;

import com.webpom.moments.entity.Like;
import com.webpom.moments.entity.R;

import java.util.List;

public interface LikeService {
    List<Like> queryByMomentsId(Integer id);

    R likeMoments(Like like, String id);
}
