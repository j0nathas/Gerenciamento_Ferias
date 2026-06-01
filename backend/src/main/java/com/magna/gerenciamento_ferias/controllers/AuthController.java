package com.magna.gerenciamento_ferias.controllers;

import com.magna.gerenciamento_ferias.domain.User;
import com.magna.gerenciamento_ferias.dto.LoginRequestDTO;
import com.magna.gerenciamento_ferias.dto.RegisterResquestDTO;
import com.magna.gerenciamento_ferias.infra.TokenService;
import com.magna.gerenciamento_ferias.repositories.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    private void setJwtCookie(HttpServletResponse response, String token) {
        response.setHeader("Set-Cookie",
                "jwt=" + token
                        + "; HttpOnly"
                        + "; SameSite=Strict"
                        + "; Path=/"
                        + "; Max-Age=28800"
                        + "; SameSite=Lax"
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequestDTO body,
            HttpServletResponse response) {

        User user = userRepository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(body.password(), user.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        String token = tokenService.generateToken(user);
        setJwtCookie(response, token);

        return ResponseEntity.ok(Map.of("nome", user.getName()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterResquestDTO body,
            HttpServletResponse response) {

        Optional<User> existing = userRepository.findByEmail(body.email());
        if (existing.isPresent()) {
            return ResponseEntity.status(409).build();
        }

        User newUser = new User();
        newUser.setPassword(passwordEncoder.encode(body.password()));
        newUser.setEmail(body.email());
        newUser.setName(body.name());
        userRepository.save(newUser);

        String token = tokenService.generateToken(newUser);
        setJwtCookie(response, token);

        return ResponseEntity.ok(Map.of("nome", newUser.getName()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) return ResponseEntity.status(401).build();

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow();

        return ResponseEntity.ok(Map.of("nome", user.getName()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        response.setHeader("Set-Cookie",
                "jwt=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0");
        return ResponseEntity.ok().build();
    }
}