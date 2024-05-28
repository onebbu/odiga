package com.odiga.mytrip.course.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import com.odiga.mytrip.course.service.CourseService;
import com.odiga.mytrip.course.vo.CourseImportVO;
import com.odiga.mytrip.course.vo.CourseVO;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class CourseDisplayController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/MyCourseDisplay")
    public List<CourseVO> getMethodName(@RequestBody Map<String, String> requestData) {
        String nickname = requestData.get("nickname");
        System.out.println("닉네임 : " + nickname +"가 접근시도");
        List<CourseVO> courseInfo = courseService.courselist(nickname);
        // System.out.println(courseInfo);
        return courseInfo;
    }
    @PostMapping("/courseimport")
    public int saveCourse(@RequestBody CourseImportVO courseImportVO) {
        int boardNo = courseService.saveCourse(courseImportVO);
        courseService.updateCourseWriteYN(courseImportVO.getCourseno());
        System.out.println("CourImportController ::::::::; courseNO" + courseImportVO.getCourseno());
        System.out.println(boardNo);
        return boardNo;
    }

    
}
