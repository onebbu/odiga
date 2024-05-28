package com.odiga.mytrip.member.controller;

import com.odiga.mytrip.member.jwt.JWTUtil;
import com.odiga.mytrip.member.oauth.SessionMember;
import com.odiga.mytrip.member.service.MemberService;
import com.odiga.mytrip.member.vo.JoinRequest;
import com.odiga.mytrip.member.vo.LoginRequest;
import com.odiga.mytrip.member.vo.Member;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class MemberController {

    private final MemberService memberService;
    private final JWTUtil jwtUtil;

    @GetMapping("/join")
    public String joinPage(Model model) {
        // 회원가입을 위해서 model 통해서 joinRequest 전달
        model.addAttribute("joinRequest", new JoinRequest());
        return "join";
    }

    @PostMapping("/join")
    public String join(@RequestBody JoinRequest joinRequest) {


        // 이메일 중복 여부 확인
        if (memberService.checkEmailDuplicate(joinRequest.getEmail())) {
            return "EMAIL_ALREADY_EXIST";
        }

        if (memberService.checkNicknameDuplicate(joinRequest.getNickname())) {
            return "NICKNAME_ALREADY_EXIST";
        }

        // 에러가 존재하지 않을 시 joinRequest 통해서 회원가입 완료
        memberService.securityJoin(joinRequest);

        log.info("회원가입이 성공했습니다.");

        // 회원가입 시 홈 화면으로 이동
        return "SIGN_UP_SUCCESS";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {

        Member member = memberService.login(loginRequest);

        if (member == null) {
            return "EMAIL_PASSWORD_NOT_MATCH";
        }

        // 60*60*1000L
        String token = jwtUtil.createJwt(member.getEmail(), String.valueOf(member.getRole()), 60*60*1000L);
        return token;
    }

    // 로그인이 성공했을 경우 정보를 넘겨주는 컨트롤러(로그인을 하지 않았을 경우 null 리턴)
    @GetMapping("/oauth-info")
    public Map<String, String> getOauthLoginInfo(
            HttpSession session)// oauth 로그인 정보
    {
        // 세션, 토큰(헤더 정보) 체크
        SessionMember sessionMember = (SessionMember) session.getAttribute("member");

        Map<String, String> loginInfo = new HashMap<>();

        if (sessionMember == null) {
            return null;
        }

        loginInfo.put("email", sessionMember.getEmail());
        loginInfo.put("nickname", sessionMember.getNickname());
        loginInfo.put("registrationId", (String) session.getAttribute("registrationId"));
        loginInfo.put("role", "USER");

        return loginInfo;
    }

    @GetMapping("/jwt-info")
    public Map<String, String> getJwtLoginInfo(
            HttpServletRequest request, HttpServletResponse response) // 로컬 스토리지 정보(헤더에 있음)
    {

        String token = request.getHeader("Authorization");

        Map<String, String> loginInfo = new HashMap<>();

        String cleanedToken = token.replace("Bearer ", "");

        String email = jwtUtil.getEmail(cleanedToken);
        Member loginMember = memberService.getLoginMemberByEmail(email);

        loginInfo.put("email", loginMember.getEmail());
        loginInfo.put("nickname", loginMember.getNickname());
        loginInfo.put("registrationId", "jwt");
        loginInfo.put("role", "USER");

        return loginInfo;
    }

}