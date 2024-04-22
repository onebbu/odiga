package com.odiga.mytrip.member.vo;


import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    private String email;
    private String password;
    private String nickname;

    private Role role;
}
