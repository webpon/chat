package com.webpom.moments.service.impl;

import com.webpom.moments.dao.CommentDao;
import com.webpom.moments.entity.Comment;
import com.webpom.moments.entity.R;
import com.webpom.moments.service.CommentService;
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
    public void deleteByMomentsId(Integer id) {
        commentDao.deleteByMomentsId(id);
    }
}
