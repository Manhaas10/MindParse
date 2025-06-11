package com.example.Backend.service;

import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Backend.Model.User;



@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        System.out.println("Incoming user: " + user);
System.out.println("Email: " + user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }



    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }


    public boolean checkPassword(String rawPassword, String encodedPassword) {
    try {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    } catch (Exception e) {
        System.err.println("Error while verifying password: " + e.getMessage());
        return false; // Return false if something goes wrong
    }
}


    
    
}
