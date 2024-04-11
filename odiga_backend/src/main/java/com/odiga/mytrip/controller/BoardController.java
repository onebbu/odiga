package com.odiga.mytrip.controller;

import com.odiga.mytrip.service.BoardService;
import com.odiga.mytrip.vo.BoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping("/board")
    public @ResponseBody List<BoardVO> selectAllArticles() {
        List<BoardVO> allList = boardService.selectAllArticles();
        return allList;
    }
}
