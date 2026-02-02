package com.telegramsaver.controller;

import com.telegramsaver.model.User;
import com.telegramsaver.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // For development
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/status")
    public ResponseEntity<?> getSubscriptionStatus(@RequestParam String email) {
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }
}
