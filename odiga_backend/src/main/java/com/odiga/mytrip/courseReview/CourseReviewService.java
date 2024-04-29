package com.odiga.mytrip.courseReview;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class CourseReviewService {

    @Autowired
    private CourseReviewDAO courseReviewDAO;

    public List<CourseReviewVO> AllCourseReviews() {
        return courseReviewDAO.AllCourseReviews();
    }

    public List<CourseReviewVO> detailPage(int boardNo) {
        System.out.println(boardNo + " 컨트롤러 실행되었음@@@@");
        return courseReviewDAO.detailPage(boardNo);
    }
    
}
