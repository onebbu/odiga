package com.ogada.mytrip.service;

import com.ogada.mytrip.dao.BoardDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {


    @Autowired
    BoardDAO boardDAO;


    public List selectAllArticles() {
        return boardDAO.selectAll();
    }
}
