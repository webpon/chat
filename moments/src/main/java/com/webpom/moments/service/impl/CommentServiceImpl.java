package com.webpom.moments.service.impl;

import com.webpom.moments.dao.CommentDao;
import com.webpom.moments.entity.Comment;
import com.webpom.moments.entity.R;
import com.webpom.moments.service.CommentService;
import com.webpom.moments.utils.Admin;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
    @Resource
    private CommentDao commentDao;

    @Override
    public List<Comment> queryByMomentsId(Integer momentsId, String userId) {
        List<Comment> comments = commentDao.queryByMomentsId(momentsId);
        boolean admin = Admin.isAdmin(userId);
        return comments.stream().map(comment -> {
            comment.setMy(comment.getUserId().equals(userId));
            // 是不是普通评论
            if (comment.getReplyId() == 0) {
                ArrayList<Comment> list = new ArrayList<>();
                comments.forEach(c -> {
                    // 判断是否是此条信息的回复
                    if (c.getReplyId() == comment.getId()) {
                        list.add(c);
                    }
                });
                comment.setChildren(list);
                comment.setAdmin(admin);
                return comment;
            }
            return null;
        })
        // 过滤空
        .filter(c -> c != null).collect(Collectors.toList());
    }

    @Override
    public R save(Comment comment, String token) {
        comment.setUserId(token);
        if (comment.getReplyId() == null) comment.setReplyId(0);
        if (commentDao.save(comment)) {
            comment.setMy(true);
            return R.ok("保存成功", comment);
        }
        return R.error("保存失败");
    }

    @Override
    public boolean deleteByMomentsId(Integer id) {
        return commentDao.deleteByMomentsId(id);
    }

    @Override
    public R deleteByIdAndUserId(Comment comment, String userId) {
        if (Admin.isAdmin(userId) ||
                commentDao.queryById(comment.getId()) != null
        ){
            return this.deleteByMomentsId(comment.getId()) ?
                    R.ok("删除成功", comment) : R.error("删除失败");
        }
        return R.error("没有这个评论");
    }
}
