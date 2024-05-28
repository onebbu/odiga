package com.odiga.mytrip.member.oauth;

import com.odiga.mytrip.member.vo.Member;
import com.odiga.mytrip.member.vo.Role;
import lombok.Builder;
import lombok.Getter;
import java.util.Map;

@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String nickname;
    private String email;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey, String nickname,
                           String email) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.email = email;
        this.nickname = nickname;
    }

    // OAuth2User에서 반환하는 사용자 정보는 Map
    // 따라서 값 하나하나를 변환해야 한다.
    public static OAuthAttributes of(String registrationId,
                                     String userNameAttributeName,
                                     Map<String, Object> attributes) {

        if ("naver".equals(registrationId)) {
            return ofNaver("id", attributes); // id를 user_name으로 지정
        }

        if ("kakao".equals(registrationId)) {
            return ofKakao("nickname", attributes); // id user_name으로 지정
        }

        return ofGoogle(userNameAttributeName, attributes);
    }

    // 구글 생성자
    private static OAuthAttributes ofGoogle(String usernameAttributeName,
                                            Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .email((String) attributes.get("email"))
                .nickname(attributes.get("nickname") == null ? "google_" + attributes.get("sub") : (String) attributes.get("nickname"))
                .attributes(attributes)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

    // 네이버 생성자
    private static OAuthAttributes ofNaver(String usernameAttributeName,
                                           Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return OAuthAttributes.builder()
                .email((String) response.get("email"))
                .nickname((String) response.get("nickname"))
                .attributes(response)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

    // 카카오 생성자
    private static OAuthAttributes ofKakao(String usernameAttributeName,
                                           Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("properties");

        return OAuthAttributes.builder()
                .email((String) response.get("nickname"))
                .nickname("kakao_"+response.get("nickname"))
                .attributes(response)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

    // User 엔티티 생성
    public Member toEntity() {
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .role(Role.USER)
                .build();
    }


}
