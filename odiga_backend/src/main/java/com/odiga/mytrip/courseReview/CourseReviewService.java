package com.odiga.mytrip.courseReview;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CourseReviewService {

    @Autowired
    private CourseReviewDAO courseReviewDAO;

    public List<CourseReviewVO> detailPage(int boardNo) {
        return courseReviewDAO.detailPage(boardNo);
    }

    @Transactional
    public void viewCount(int boardNo) {
        courseReviewDAO.viewCount(boardNo);
    }

    public List<CommentsVO> comments(int boardNo) {
        return courseReviewDAO.comments(boardNo);
    }

    @Transactional
    public void commentWrite(CommentsVO commentsVO) {
        courseReviewDAO.commentWrite(commentsVO);
    }

    @Transactional
    public void boardGrade(int boardNo) {
        courseReviewDAO.boardGrade(boardNo);
    }

    @Transactional
    public void likeCount(int boardNo) {
        courseReviewDAO.likeCount(boardNo);
    }

    @Transactional
    public void likeCancel(int boardNo) {
        courseReviewDAO.likeCancel(boardNo);
    }

    @Transactional
    public void articleDelete(int boardNo) {
        courseReviewDAO.articleDelete(boardNo);
    }

    // 마이페이지에서 코스 리뷰 가져오기
    public List<CourseReviewVO> getMemberArticles(String nickname) {
        return courseReviewDAO.getMemberArticles(nickname);
    }

    @Transactional
    public void commentDel(CommentsVO commentsVO) {
        courseReviewDAO.commentDel(commentsVO);
    }

    public List<CourseReviewVO> courseReviewSearch(String search) {
        return courseReviewDAO.courseReviewSearch(search);
    }

    @Transactional
    public void courseReviewEdit(CourseReviewVO CourseReviewVO) {
        courseReviewDAO.courseReviewEdit(CourseReviewVO);
    }

    @Transactional
    public void commentEdit(CommentsVO commentsVO) {
        courseReviewDAO.commentEdit(commentsVO);
    }


}