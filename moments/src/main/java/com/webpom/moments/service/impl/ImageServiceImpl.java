package com.webpom.moments.service.impl;

import com.webpom.moments.dao.ImageDao;
import com.webpom.moments.entity.Image;
import com.webpom.moments.service.ImageService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {
    @Resource
    private ImageDao imageDao;
    @Override
    public void saveList(List<Image> images) {
        imageDao.saveList(images);
    }

    @Override
    public List<Image> queryByMomentsId(Integer id) {
        return imageDao.queryByMomentsId(id);
    }

    @Override
    public void deleteByMomentsId(Integer id) {
        imageDao.deleteByMomentsId(id);
    }
}
