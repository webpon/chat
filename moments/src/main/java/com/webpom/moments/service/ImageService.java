package com.webpom.moments.service;

import com.webpom.moments.entity.Image;

import java.util.List;

public interface ImageService {
    /**
     * 保存图片
     */
    void saveList(List<Image> images);

    /**
     * 按照朋友圈id查询
     */
    List<Image> queryByMomentsId(Integer id);
}
