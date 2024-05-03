package com.odiga.mytrip.member.service;


import com.odiga.mytrip.member.dao.MemberDAO;
import com.odiga.mytrip.member.vo.LoginRequest;
import com.odiga.mytrip.member.vo.Member;
import com.odiga.mytrip.member.vo.JoinRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberDAO memberDAO;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public boolean checkLoginEmailDuplicate(String email){

        if (memberDAO.existsByLoginEmail(email) == 1) {
            return true;
        }
        return false;
    }


    public void join(JoinRequest joinRequest) {
        memberDAO.save(joinRequest.toEntity());
    }

    public Member login(LoginRequest loginRequest) {
        Member findMember = memberDAO.findByLoginEmail(loginRequest.getEmail());

        if(findMember == null){
            return null;
        }

        if (!findMember.getPassword().equals(loginRequest.getPassword())) {
            return null;
        }

        return findMember;
    }

    public Member getLoginMemberByEmail(String email){
        if(email == null) return null;

        Optional<Member> findMember = Optional.ofNullable(memberDAO.findByLoginEmail(email));
        return findMember.orElse(null);

    }

    // BCryptPasswordEncoder 를 통해서 비밀번호 암호화 작업 추가한 회원가입 로직
    public void securityJoin(JoinRequest joinRequest){
        if(memberDAO.existsByLoginEmail(joinRequest.getEmail())==1){
            return;
        }

        memberDAO.save(joinRequest.toEntity());

        joinRequest.setPassword(bCryptPasswordEncoder.encode(joinRequest.getPassword()));

    }

}
