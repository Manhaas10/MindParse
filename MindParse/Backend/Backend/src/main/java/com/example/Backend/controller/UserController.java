package com.example.Backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.Model.User;
import com.example.Backend.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
public ResponseEntity<String> registerUser(@RequestBody User user) {
    try {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully: " + registeredUser.getFullName());
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
    }
}
   @PostMapping("/login")
public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
    try {
        System.out.println("Login request received for email: " + loginRequest.getEmail());

        User existingUser = userService.getUserByEmail(loginRequest.getEmail());

        if (existingUser == null) {
            System.err.println("Login failed: User not found for email " + loginRequest.getEmail());
            return ResponseEntity.badRequest().body("User not found");
        }

        System.out.println("User found: " + existingUser.getFullName());
        System.out.println("Checking password...");

        boolean passwordMatch = userService.checkPassword(loginRequest.getPassword(), existingUser.getPassword());

        if (!passwordMatch) {
            System.err.println("Login failed: Invalid password for email " + loginRequest.getEmail());
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        System.out.println("Login successful: " + existingUser.getFullName());
        return ResponseEntity.ok("Login successful: Welcome, " + existingUser.getFullName());
    } catch (Exception e) {
        System.err.println("Login error: " + e.getMessage());
        return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
    }
}

    // Add more endpoints as needed for user management





    
}
