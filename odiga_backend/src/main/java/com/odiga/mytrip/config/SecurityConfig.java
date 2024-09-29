package com.odiga.mytrip.config;

import com.odiga.mytrip.member.jwt.JWTFilter;
import com.odiga.mytrip.member.jwt.JWTUtil;
import com.odiga.mytrip.member.jwt.LoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationConfiguration configuration;
    private final JWTUtil jwtUtil;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Value("${custum.adderess.spring}")
    private String address;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // csrf disable 설정
        http
                .csrf((auth) -> auth.disable())  // CSRF 보호 비활성화
                .formLogin((auth) -> auth.disable()) // 폼로그인 형식 disable 설정 => POSTMAN으로 검증할 것임!
                .httpBasic((auth -> auth.disable())) // HTTP 기본 인증 비활성화
                .headers((headerConfig) -> headerConfig.frameOptions(frameOptionsConfig -> frameOptionsConfig.disable())); // X-Frame-Options 헤더를 구성, iframe 내에서 웹 애플리케이션을 렌더링(X-Frame-Options 헤더를 비활성화, 다른 도메인의 iframe 내에서 로드)


        // 스프링 시큐리티 jwt 로그인 - 경로별 인가 작업
        // 관리자 기능이 추가될 경우 인가 작업에 ADMIN 추가 필요
        http
                .authorizeHttpRequests((auth) -> auth
                        // jwt login
                        .requestMatchers("/auth", "/auth/", "/auth/login", "/auth/join").permitAll()
                        // google oauth login
                        .requestMatchers("/oauth2/callback/google", "/oauth2/authorization/google").permitAll()
                        // my-page
                        // .requestMatchers("/my-page/**").hasRole("USER")
                        // generate course
                        // .requestMatchers("/MyCourseDisplay/**", "/place/savedata/**").hasRole("USER")
                        // genaerate courseReview
                        // .requestMatchers("/coursereview/commentWrite/**", "/coursereview/commentDel/**", "/coursereview/like/**", "/coursereview/likeCancel/**", "/coursereview/delete/**", "/coursereview/update/**", "/courseimport/**").hasRole("USER")
                        // Location add & delete wish
                        // .requestMatchers("/WishDelete/**", "/travelLike/**").hasRole("USER")
                        .anyRequest().permitAll()
                );

        // http.logout: 세션 삭제+쿠키 삭제(JSESSIONID)
        http
                .logout(logout ->
                        logout
                                .logoutUrl("/auth/logout") // 로그아웃 엔드포인트를 설정합니다.
                                .invalidateHttpSession(true) // HTTP 세션을 무효화합니다.
                                .logoutSuccessUrl(address) // 로그아웃 성공 시 리다이렉트할 경로를 설정합니다.
                                .deleteCookies("JSESSIONID") // 쿠키를 삭제합니다.
                )
                .oauth2Login(oauth2 ->
                        oauth2
                                .defaultSuccessUrl(address, true) // 구글 로그인 성공 후 리디렉션될 URI를 설정합니다.
                );


        // 세션 설정
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 새로 만든 로그인 필터를 원래의 (UsernamePasswordAuthenticationFilter)의 자리에 넣음
        http
                .addFilterAt(new LoginFilter(authenticationManager(configuration), jwtUtil), UsernamePasswordAuthenticationFilter.class);

        // 로그인 필터 이전에 JWTFilter를 넣음
        http
                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);


        return http.build();
    }


    // BCrypt password encoder를 리턴하는 메서드
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}