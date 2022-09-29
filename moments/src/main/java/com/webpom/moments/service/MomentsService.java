package com.webpom.moments.service;

import com.webpom.moments.entity.Moments;
import com.webpom.moments.entity.R;

public interface MomentsService {
    /**
     * 保存朋友圈
     */
    R save(Moments moments, String id);

    /**
     * 查询朋友圈
     */
    R query(Integer p, String userId);
}
