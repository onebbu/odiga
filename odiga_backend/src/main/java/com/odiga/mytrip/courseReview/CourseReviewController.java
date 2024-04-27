package com.odiga.mytrip.courseReview;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseReviewController {

    @Autowired
    private CourseReviewService courseReviewService;

    @GetMapping("/coursereview")
    public List<CourseReviewVO> AllCourseReviews() {
        System.out.println("coursereview 컨트롤러 실행되었음@@@@");
        return courseReviewService.AllCourseReviews();
    }

    @GetMapping("/coursereview/detail/{boardNo}")
    public List<CourseReviewVO> detailPage(@PathVariable int boardNo) {
        System.out.println(boardNo + " 컨트롤러 실행되었음@@@@");
        return courseReviewService.detailPage(boardNo);
    }
    
}
