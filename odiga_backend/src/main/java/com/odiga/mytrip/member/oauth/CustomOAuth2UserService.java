package com.odiga.mytrip.member.oauth;


import com.odiga.mytrip.member.dao.MemberDAO;
import com.odiga.mytrip.member.vo.Member;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;


// 구글 로그인 이후 가져온 사용자의 정보(email, name, picture 등)를 기반으로 가입 및 정보 수정, 세션 저장 기능 등의 기능을 수행
// /oauth2/authorization/google
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberDAO memberDAO;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);


        // 로그인 진행 중인 서비스를 구분
        // 네이버로 로그인 진행 중인지, 구글로 로그인 진행 중인지, ... 등을 구분
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // OAuth2 로그인 진행 시 키가 되는 필드 값(Primary Key와 같은 의미)
        // 구글의 경우 기본적으로 코드를 지원
        // 하지만 네이버, 카카오 등은 기본적으로 지원 X
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        // OAuth2UserService를 통해 가져온 OAuth2User의 attribute 등을 담을 클래스
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        // 사용자 저장 또는 업데이트
        Member member = saveOrUpdateAndGet(attributes);

        httpSession.setAttribute("member", new SessionMember(member));
        httpSession.setAttribute("registrationId", registrationId);


        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRole().name())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }


    @Transactional
    public Member saveOrUpdateAndGet(OAuthAttributes attributes) {

        Member member = memberDAO.findByLoginEmail(attributes.getEmail());


        if (member != null) {
            // 구글 사용자 정보 업데이트(이미 가입된 사용자) => 업데이트
            memberDAO.updateOauthMember(attributes.toEntity());

        } else {
            // 가입되지 않은 사용자 / 계정이 없으면 DB에 insert
            memberDAO.save(attributes.toEntity());
            // 새로운 사용자를 저장한 후 해당 사용자 객체를 가져옴
            member = memberDAO.findByLoginEmail(attributes.getEmail());
        }
        return member;
    }
}