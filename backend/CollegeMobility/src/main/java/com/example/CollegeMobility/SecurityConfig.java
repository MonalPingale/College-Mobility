package com.example.CollegeMobility;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.example.CollegeMobility.util.JWTutilsToken;
import com.example.CollegeMobility.util.JwtAuthFilter;

@Configuration
public class SecurityConfig {

    private final JWTutilsToken jwtUtilsToken;

    public SecurityConfig(JWTutilsToken jwtUtilsToken) {
        this.jwtUtilsToken = jwtUtilsToken;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // ✅ THIS IS THE FIX (Boot 4 compatible)
            .cors(Customizer.withDefaults())

            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/student/login",
                    "/teacher/login"
                ).permitAll()
                .anyRequest().authenticated()
            )

            .addFilterBefore(
                new JwtAuthFilter(jwtUtilsToken),
                org.springframework.security.web.authentication
                    .UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
