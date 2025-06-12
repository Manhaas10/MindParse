package com.example.Backend.repository;

import com.example.Backend.Model.QuestionAnswerSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionAnswerSetRepository extends JpaRepository<QuestionAnswerSet, Long> {
    List<QuestionAnswerSet> findBySessionId(Long sessionId);
}
