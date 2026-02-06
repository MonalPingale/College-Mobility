package com.example.CollegeMobility.util;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthFilter extends OncePerRequestFilter {

    private final JWTutilsToken jwtUtilsToken;

    public JwtAuthFilter(JWTutilsToken jwtUtilsToken) {
        this.jwtUtilsToken = jwtUtilsToken;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String token = null;
        String uri = request.getRequestURI();

        // 🍪 Read correct token based on route
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {

                // ✅ Student routes
                if (uri.startsWith("/student")
                        && "STUDENT_TOKEN".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }

                // ✅ Teacher routes
                if (uri.startsWith("/teacher")
                        && "TEACHER_TOKEN".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token != null) {
            try {
                String username = jwtUtilsToken.extractUsername(token);

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                username, null, null);

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request));

                SecurityContextHolder.getContext()
                        .setAuthentication(authToken);

            } catch (Exception e) {
                // invalid token → ignore
            }
        }

        filterChain.doFilter(request, response);
    }
}
