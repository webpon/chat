package com.webpom.moments.service.impl;

import com.auth0.jwt.interfaces.Claim;
import com.webpom.moments.dao.ImageDao;
import com.webpom.moments.dao.MomentsDao;
import com.webpom.moments.entity.*;
import com.webpom.moments.service.CommentService;
import com.webpom.moments.service.ImageService;
import com.webpom.moments.service.LikeService;
import com.webpom.moments.service.MomentsService;
import com.webpom.moments.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class MomentsServiceImpl implements MomentsService {

    @Resource
    private MomentsDao momentsDao;
    @Resource
    private ImageService imageService;
    @Resource
    private LikeService likeService;
    @Resource
    private CommentService commentService;

    @Override
    public R save(Moments moments, String id) {
        moments.setUserId(id);
        boolean save = momentsDao.save(moments);
        if (save){
            List<Image> images = moments.getImages();
            if (!(images == null) && !images.isEmpty()){
                // 循环保存图片
                images.forEach(image -> {
                    image.setMomentsId(moments.getId());
                });
                imageService.saveList(images);
            }
            return R.ok( "保存成功", moments);
        }
        return R.error("保存失败");
    }

    @Override
    public R query(Integer p, String userId) {
        if (p == null){
            p = 1;
        }
        Integer size = (p - 1) * 20;
        List<Moments> list = momentsDao.query(size);
        if (!list.isEmpty()){
            ArrayList<Collect> collects = new ArrayList<>();
            list.forEach(moments -> {
                moments.setImages(imageService.queryByMomentsId(moments.getId()));
                List<Comment> comments = commentService.queryByMomentsId(moments.getId(), userId);
                List<Like> likes = likeService.queryByMomentsId(moments.getId());
                boolean b = moments.getUserId().equals(userId);
                moments.setMy(b);
                collects.add(new Collect(moments,comments, likes, b));
            });
            return R.ok(collects);
        }
        return R.error("没有更多朋友圈");
    }

    @Override
    public R delete(Integer id, String userId) {
        Moments moments = momentsDao.queryByIdAndUserId(id,userId);
        if (moments == null) {
            return R.error("这不是你的 或者 没有这条朋友圈");
        }
        likeService.deleteByMomentsId(id);
        commentService.deleteByMomentsId(id);
        imageService.deleteByMomentsId(id);
        if (momentsDao.deleteById(id)){
            return R.ok("删除成功");
        }
        return R.error("删除失败");
    }
}
