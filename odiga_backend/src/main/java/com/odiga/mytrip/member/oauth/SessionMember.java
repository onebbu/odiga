package com.odiga.mytrip.member.oauth;

import com.odiga.mytrip.member.vo.Member;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionMember implements Serializable { // 직렬화 기능을 가진 세션 DTO

    // 인증된 사용자 정보만 필요 => name, email 필드만 선언
    private String nickname;
    private String email;

    public SessionMember(Member member) {
        this.nickname = member.getNickname();
        this.email = member.getEmail();
    }
}