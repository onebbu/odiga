package com.odiga.mytrip.courseReview;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
public class CourseReviewController {

    @Autowired
    private CourseReviewService courseReviewService;

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
        commentsVO.setBoardNo(boardNo);
        courseReviewService.commentWrite(commentsVO);
        courseReviewService.boardGrade(boardNo);
    }

    @PostMapping("/coursereview/commentDel")
    public void commentDel(@RequestBody CommentsVO commentsVO) {
        courseReviewService.commentDel(commentsVO);
    }

    @PostMapping("/coursereview/commentEdit")
    public void commentEdit(@RequestBody CommentsVO commentsVO) {
        courseReviewService.commentEdit(commentsVO);
    }

    @PostMapping("/coursereview/like/{boardNo}")
    public void likeCount(@PathVariable int boardNo) {
        courseReviewService.likeCount(boardNo);
    }

    @PostMapping("/coursereview/likeCancel/{boardNo}")
    public void likeCancel(@PathVariable int boardNo) {
        courseReviewService.likeCancel(boardNo);
    }
    
    @PutMapping("/coursereview/delete/{boardNo}")
    public void articleDelete(@PathVariable int boardNo) {
        System.out.println("삭제요청");
        courseReviewService.articleDelete(boardNo);
    }

    @PutMapping("/coursereview/update/{boardNo}")
    public void courseReviewEdit(@RequestBody CourseReviewVO CourseReviewVO) {
        System.out.println("작동");
        courseReviewService.courseReviewEdit(CourseReviewVO);
    }

    @GetMapping("/coursereviewsearch")
    public List<CourseReviewVO> courseReviewSearch(@RequestParam("query") String search) {
        return courseReviewService.courseReviewSearch(search);
    }

    // 마이페이지 작성 글 가져오기
    @GetMapping("/my-page/my-article/{nickname}")
    public Map<Integer, Object> getArticleList(@PathVariable String nickname) {
        Map<Integer, Object> articleList = new HashMap<>();
        List<CourseReviewVO> memberArticles = courseReviewService.getMemberArticles(nickname);
        int i = 0;
        for (CourseReviewVO review : memberArticles) {
            articleList.put(i, review);
            i++;
        }

        return articleList;
    }
}
