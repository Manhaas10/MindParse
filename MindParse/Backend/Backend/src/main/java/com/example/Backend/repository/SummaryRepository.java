package com.example.Backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Backend.Model.Summary;

public interface SummaryRepository extends JpaRepository<Summary, Long> {

    // Fetch all summaries by user email (for history)
    List<Summary> findByUserEmail(String userEmail);
    List<Summary> findByUserEmailOrderByCreatedAtDesc(String userEmail);

}
