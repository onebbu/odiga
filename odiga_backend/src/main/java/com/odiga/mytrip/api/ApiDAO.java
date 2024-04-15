package com.odiga.mytrip.api;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ApiDAO {
    void saveData(ApiVO apiVO);
}
