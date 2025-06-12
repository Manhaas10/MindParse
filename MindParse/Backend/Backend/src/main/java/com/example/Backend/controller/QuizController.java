package com.example.Backend.controller;

import com.example.Backend.Model.QuizQuestion;
import com.example.Backend.service.QuizGenerationService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/quiz-mcq")
public class QuizController {

    @Autowired
    private QuizGenerationService quizService;

    // Upload a file, extract text, generate MCQs with options and answer
    @PostMapping("/upload")
    public ResponseEntity<?> uploadAndGenerateQuiz(@RequestParam("file") MultipartFile file,
                                                   @RequestParam("difficulty") String level,
                                                   @RequestParam("email") String email) {
        try {
            List<QuizQuestion> result = quizService.generateQuiz(file, level, email);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Generate a new set of MCQs from previously stored content

}
