package com.ogada.mytrip.dao;

import com.ogada.mytrip.vo.BoardVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardDAO {
    public List<BoardVO> selectAll();
}
