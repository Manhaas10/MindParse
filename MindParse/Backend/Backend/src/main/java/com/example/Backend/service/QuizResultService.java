package com.example.Backend.service;


import com.example.Backend.Model.QuizResult;
import com.example.Backend.repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizResultService {

    @Autowired
    private QuizResultRepository quizResultRepository;

    public void saveResults(List<QuizResult> results) {
        quizResultRepository.saveAll(results);
    }
}
