package com.odiga.mytrip.member.jwt;

import com.odiga.mytrip.member.dao.MemberDAO;
import com.odiga.mytrip.member.vo.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    // 스프링 시큐리티로 로그인 진행 시 기존처럼 Member 객체가 아닌 CustomUserDetails(member) 가 필요함
    // DB와 연결하여 사용

    private MemberDAO memberDAO;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Member member = memberDAO.findByLoginEmail(username);
        if(member != null) {
            return new CustomUserDetails(member);
        }
        return null;
    }
}
