package com.odiga.mytrip.courseReview;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseReviewService {

    @Autowired
    private CourseReviewDAO courseReviewDAO;

    public List<CourseReviewVO> AllCourseReviews() {
        return courseReviewDAO.AllCourseReviews();
    }

    public List<CourseReviewVO> detailPage(int boardNo) {
        return courseReviewDAO.detailPage(boardNo);
    }

    public void viewCount(int boardNo) {
        courseReviewDAO.viewCount(boardNo);
    }

    public List<CommentsVO> comments(int boardNo) {
        return courseReviewDAO.comments(boardNo);
    }

    public void commentWrite(CommentsVO commentsVO) {
        courseReviewDAO.commentWrite(commentsVO);
    }

    public void boardGrade(int boardNo) {
        courseReviewDAO.boardGrade(boardNo);
    }

    public void likeCount(int boardNo) {
        courseReviewDAO.likeCount(boardNo);
    }

    
}
