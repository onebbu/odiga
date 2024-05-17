package com.odiga.mytrip.resultlist.service;

import com.odiga.mytrip.resultlist.dao.ResultDAO;
import com.odiga.mytrip.resultlist.vo.ResultVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultDAO resultDAO;

    // for문을 통해서
    public List<ResultVO> findById(String courseNo){
        // map으로 가져와서 순서대로 출력
        return resultDAO.selectResultList(courseNo);
    }

    public List<ResultVO> findAllResultTitles(String nickname){
        // map으로 가져와서 순서대로 출력
        return resultDAO.findAllTitles(nickname);
    }

    public int findMaxTravelNum(String courseNo, int courseDay){
        return resultDAO.maxTravelNum(courseNo, courseDay);
    }

    public String findCategory(String category) {
        return resultDAO.findCategory(category);
    }

    public String findSharePw(String courseNo) {
        return resultDAO.findSharePw(courseNo);
    }

    public String findCategoryKR(String category) {
        return resultDAO.findCategoryKR(category);
    }

    @Transactional
    public void saveCoursePw(String coursePw, String courseNo){
        resultDAO.savePw(coursePw, courseNo);
    }

    @Transactional
    public void deleteTravelResult(String courseNo){
        resultDAO.deleteTravelResult(courseNo);
    }
}
