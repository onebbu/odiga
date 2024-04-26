package com.odiga.mytrip.courseReview;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

@Repository("courseReviewDAO")
public class CourseReviewDAO {

    @Autowired
    private SqlSession sqlSession;

    public List<CourseReviewVO> AllCourseReviews() {
        List<CourseReviewVO> AllCoureseReviews = AllCoureseReviews = sqlSession.selectList("com.odiga.mytrip.courseReview.CourseReviewMapper.getAllCourseReviews");
        return AllCoureseReviews;
    }

    public List<CourseReviewVO> detailPage(int boardNo) {
        List<CourseReviewVO> detailPage = detailPage = sqlSession.selectList("com.odiga.mytrip.courseReview.CourseReviewMapper.detailPage", boardNo);
        return detailPage;
    }
    
}

