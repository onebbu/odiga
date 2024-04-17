package com.odiga.mytrip.config;

import com.odiga.mytrip.member.jwt.JWTFilter;
import com.odiga.mytrip.member.jwt.JWTUtil;
import com.odiga.mytrip.member.jwt.LoginFilter;
import lombok.RequiredArgsConstructor;
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


    // 시큐리티 필터 메서드
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        // 스프링 시큐리티 jwt 로그인 설정

        // csrf disable 설정
        http
                .csrf((auth) -> auth.disable());

        // 폼로그인 형식 disable 설정 => POSTMAN으로 검증할 것임!
        http
                .formLogin((auth) -> auth.disable());

        // http basic 인증 방식 disable 설정
        http
                .httpBasic((auth -> auth.disable()));

        // 경로별 인가 작업
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/jwt-login", "/jwt-login/", "/jwt-login/login", "/jwt-login/join").permitAll()
                        .requestMatchers("/jwt-login/admin").hasRole("ADMIN")
                        .anyRequest().authenticated()
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
    public BCryptPasswordEncoder bCryptPasswordEncoder(){


        return new BCryptPasswordEncoder();
    }
}
