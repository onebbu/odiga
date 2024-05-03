package com.odiga.mytrip.courseReview;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseReviewController {

    @Autowired
    private CourseReviewService courseReviewService;

    @GetMapping("/coursereview")
    public List<CourseReviewVO> AllCourseReviews() {
        return courseReviewService.AllCourseReviews();
    }

    @GetMapping("/coursereview/detail/{boardNo}")
    public List<CourseReviewVO> detailPage(@PathVariable int boardNo) {
        courseReviewService.viewCount(boardNo);
        return courseReviewService.detailPage(boardNo);
    }

    @GetMapping("/coursereview/allComments/{boardNo}")
    public List<CommentsVO> comments(@PathVariable int boardNo) {
        return courseReviewService.comments(boardNo);
    }

    @PostMapping("/coursereview/commentWrite/{boardNo}")
    public void commentWrite(@PathVariable int boardNo, @RequestBody CommentsVO commentsVO) {
        commentsVO.setBoardNo(boardNo); // commentsVO에 boardNo 설정
        courseReviewService.commentWrite(commentsVO); // 댓글 작성 서비스 호출
        courseReviewService.boardGrade(boardNo); // 별점 계산 서비스 호출
    }

    @PostMapping("/coursereview/like/{boardNo}")
    public void likeCount(@PathVariable int boardNo) {
        System.out.println("라이크 컨트롤러 실행");
        courseReviewService.likeCount(boardNo); // 댓글 작성 서비스 호출
    }
    
}
