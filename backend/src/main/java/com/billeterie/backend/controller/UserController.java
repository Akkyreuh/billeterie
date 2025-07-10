package com.billeterie.backend.controller;

import com.billeterie.backend.model.User;
import com.billeterie.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final com.billeterie.backend.validation.UserValidator userValidator;

    public UserController(UserService userService, com.billeterie.backend.validation.UserValidator userValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        if (!userValidator.isValid(user)) {
            return ResponseEntity.badRequest().build();
        }
        User saved = userService.saveUser(user);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/login")
    public ResponseEntity<User> getByEmail(@RequestParam String email) {
        Optional<User> user = userService.findByEmail(email);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
