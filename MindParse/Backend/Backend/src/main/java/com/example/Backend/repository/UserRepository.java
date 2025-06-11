package com.example.Backend.repository;

import com.example.Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
        Optional<User> findByEmail(String email); 
        boolean existsByEmail(String email);
        boolean existsByFullName(String fullName);
        Optional<User> findByFullName(String fullName);
}
    
//long is primary key type
