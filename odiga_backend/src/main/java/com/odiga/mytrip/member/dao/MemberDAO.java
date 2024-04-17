package com.odiga.mytrip.member.dao;

import com.odiga.mytrip.member.vo.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberDAO {
    // 로그인 ID를 갖는 객체가 존재하는지 => 존재하면 true 리턴 (ID 중복 검사 시 필요)
    Integer existsByLoginEmail(@Param("email") String email);

    // 로그인 ID를 갖는 객체 반환
    Member findByLoginEmail(@Param("email") String email);

    void save(@Param("member") Member member);
}
