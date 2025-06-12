package com.example.Backend.controller;


import com.example.Backend.Model.QuizResult;
import com.example.Backend.service.QuizResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizResultController {

    @Autowired
    private QuizResultService quizResultService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitQuiz(@RequestBody List<QuizResult> results) {
        quizResultService.saveResults(results);
        return ResponseEntity.ok("Quiz results submitted successfully");
    }
}
