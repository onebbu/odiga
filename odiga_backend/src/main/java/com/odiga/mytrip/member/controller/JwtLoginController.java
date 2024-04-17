package com.odiga.mytrip.member.controller;


import com.odiga.mytrip.member.jwt.JWTUtil;
import com.odiga.mytrip.member.service.MemberService;
import com.odiga.mytrip.member.vo.JoinRequest;
import com.odiga.mytrip.member.vo.LoginRequest;
import com.odiga.mytrip.member.vo.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Iterator;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class JwtLoginController {

    private final MemberService memberService;
    private final JWTUtil jwtUtil;

    @GetMapping(value = {"", "/"})
    public Member home(Model model) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        String role = auth.getAuthority();

        Member loginMember = memberService.getLoginMemberByEmail(email);

        if (loginMember != null) {
            model.addAttribute("nickname", loginMember.getNickname());
        }
        return loginMember;
    }

    @GetMapping("/join")
    public String joinPage(Model model) {
        // 회원가입을 위해서 model 통해서 joinRequest 전달
        model.addAttribute("joinRequest", new JoinRequest());
        return "join";
    }

    @PostMapping("/join")
    public String join(@RequestBody JoinRequest joinRequest,
                       BindingResult bindingResult, Model model) {

        log.info("이메일={}", joinRequest.getEmail());

        // 이메일 중복 여부 확인
        if (memberService.checkLoginEmailDuplicate(joinRequest.getEmail())) {
            log.info("이미 이메일이 존재합니다.");
            return "EMAIL_ALREADY_EXIST";
        }

        // 에러가 존재하지 않을 시 joinRequest 통해서 회원가입 완료
        memberService.securityJoin(joinRequest);

        log.info("회원가입이 성공했습니다.");

        // 회원가입 시 홈 화면으로 이동
        return "SIGN_UP_SUCCESS";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest){

        Member member = memberService.login(loginRequest);


        if(member==null){
            return "EMAIL_PASSWORD_NOT_MATCH";
        }

        String token = jwtUtil.createJwt(member.getEmail(), String.valueOf(member.getRole()), 1000 * 60 * 60L);
        return token;
    }

    @GetMapping("/info")
    public String memberInfo(Authentication auth, Model model) {

        Member loginMember = memberService.getLoginMemberByEmail(auth.getName());

        return "email : " + loginMember.getEmail() + "\n이름 : " + loginMember.getNickname() + "\nrole : " + loginMember.getRole();
    }

    @GetMapping("/admin")
    public String adminPage(Model model) {

        return "AUTH_COMPLETE";
    }
}