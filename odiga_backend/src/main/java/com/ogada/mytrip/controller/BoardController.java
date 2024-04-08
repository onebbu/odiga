package com.ogada.mytrip.controller;

import com.ogada.mytrip.service.BoardService;
import com.ogada.mytrip.vo.BoardVO;
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
