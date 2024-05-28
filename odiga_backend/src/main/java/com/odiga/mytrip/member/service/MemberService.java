package com.odiga.mytrip.member.service;

import com.odiga.mytrip.member.dao.MemberDAO;
import com.odiga.mytrip.member.vo.LoginRequest;
import com.odiga.mytrip.member.vo.Member;
import com.odiga.mytrip.member.vo.JoinRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberDAO memberDAO;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public boolean checkEmailDuplicate(String email){

        if (memberDAO.existsByEmail(email) == 1) {
            return true;
        }
        return false;
    }


    public boolean checkNicknameDuplicate(String nickname){

        if (memberDAO.existsByNickname(nickname) == 1) {
            return true;
        }
        return false;
    }

    @Transactional
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
        if(memberDAO.existsByEmail(joinRequest.getEmail())==1){
            return;
        }

        memberDAO.save(joinRequest.toEntity());

        joinRequest.setPassword(bCryptPasswordEncoder.encode(joinRequest.getPassword()));

    }

}
