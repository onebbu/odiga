package com.odiga.mytrip.course.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.odiga.mytrip.course.service.CourseService;
import com.odiga.mytrip.course.vo.CourseVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CourseDisplayController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/CourseDisplay")
    public List<CourseVO> getMethodName(@RequestParam String nickname) {
        System.out.println(nickname);
        List<CourseVO> courseInfo = courseService.courselist(nickname);
        System.out.println(courseInfo);
        return courseInfo;
    }
}
