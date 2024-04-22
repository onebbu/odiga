package com.odiga.mytrip.member.controller;

import com.odiga.mytrip.member.oauth.SessionMember;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class SessionController {

    @GetMapping("/session-info")
    @ResponseBody
    public Map<String, String> getSessionInfo(HttpSession session) {
        Map<String, String> sessionInfo = new HashMap<>();

        // 세션에 저장된 정보를 가져와서 Map에 담습니다.
        SessionMember sessionMember = (SessionMember) session.getAttribute("member");
        if (sessionMember != null) {
            sessionInfo.put("email", sessionMember.getEmail());
            sessionInfo.put("nickname", sessionMember.getNickname());
        }

        return sessionInfo;
    }
}
