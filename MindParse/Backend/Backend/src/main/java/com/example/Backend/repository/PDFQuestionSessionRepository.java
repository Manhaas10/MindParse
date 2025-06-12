package com.example.Backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Backend.Model.PDFQuestionSession;

public interface PDFQuestionSessionRepository extends JpaRepository<PDFQuestionSession, Long> {
    List<PDFQuestionSession> findByUserEmailOrderByUploadedAtDesc(String email);
    List<PDFQuestionSession> findBySessionId(String sessionId);
    
}
