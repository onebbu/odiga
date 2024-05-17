package com.odiga.mytrip.course.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.odiga.mytrip.course.dao.CourseDAO;
import com.odiga.mytrip.course.vo.CourseVO;

@Service
public class CourseService {

    @Autowired
    private CourseDAO courseDAO;
    
    public List<CourseVO> courselist(String nickname) {
        if (nickname == null) {
            System.out.println("nickname이 null입니다.");
        }
        List<CourseVO> Courselist = courseDAO.getResultList(nickname);
        return Courselist;    
    }
    
    @Transactional
    public void saveCourse(String boardTitle, String boardContent , String mainimage , String tags, String email , String nickname , String courseno) {
        courseDAO.saveCourseData(boardTitle, boardContent , mainimage , tags , email , nickname ,courseno);
    }
    
}
