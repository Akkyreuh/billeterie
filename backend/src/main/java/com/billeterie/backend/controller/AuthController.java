package com.billeterie.backend.controller;

import com.billeterie.backend.model.User;
import com.billeterie.backend.security.JwtUtil;
import com.billeterie.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String password = payload.get("password");
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            User user = userService.findByEmail(email).orElseThrow();
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole());
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
