package com.odiga.mytrip.course.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import com.odiga.mytrip.course.service.CourseService;
import com.odiga.mytrip.course.vo.CourseVO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public String postMethodName(@RequestBody Map<String, String> courseRequest) {
        String boardTitle = courseRequest.get("Title");
        String boardContent = courseRequest.get("BoardContent");
        String mainimage = courseRequest.get("MainImage");
        String tags = courseRequest.get("Tags");
        String email = courseRequest.get("email");
        String nickname = courseRequest.get("nickname");
        String courseno = courseRequest.get("courseno");
 
        courseService.saveCourse(boardTitle,boardContent,mainimage,tags,email,nickname,courseno);
     
        return "코스 정보가 성공적으로 저장되었습니다.";
    }

    
}
