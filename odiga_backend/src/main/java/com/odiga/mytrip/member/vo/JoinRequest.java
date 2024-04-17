package com.odiga.mytrip.member.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequest {

    private String email;
    private String password;
    private String passwordCheck;

    private String nickname;

    public Member toEntity(){
        return Member.builder()
                .email(this.email)
                .password(this.password)
                .nickname(this.nickname)
                .role(Role.USER)
                .build();
    }
}
