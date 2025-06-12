package com.example.Backend.repository;

import com.example.Backend.Model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    // You can add custom query methods here if needed
}
