package com.webpom.moments.service.impl;

import com.webpom.moments.dao.LikeDao;
import com.webpom.moments.entity.Like;
import com.webpom.moments.entity.R;
import com.webpom.moments.service.LikeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {
    @Resource
    private LikeDao likeDao;
    @Override
    public List<Like> queryByMomentsId(Integer id) {
        return likeDao.queryByMomentsId(id);
    }

    @Override
    public R likeMoments(Like like, String id) {
        like.setUserId(id);
        Like l = this.queryByUserIdAndMomentsId(like);
        if (l != null && l.getUserId().equals(id)){
            return this.unLike(l);
        }
        return this.like(like);
    }

    @Override
    public void deleteByMomentsId(Integer id) {
        likeDao.deleteByMomentsId(id);
    }

    private Like queryByUserIdAndMomentsId(Like like) {
        return likeDao.queryByUserIdAndMomentsId(like);
    }


    private R unLike(Like like) {
        if (likeDao.delete(like))
            return R.ok("取消成功");
        return R.error("取消失败");
    }

    private R like(Like like) {
        if (likeDao.save(like))
            return R.ok( "点赞成功",like);
        return R.error("点赞失败");
    }
}
