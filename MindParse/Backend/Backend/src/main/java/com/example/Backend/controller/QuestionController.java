package com.example.Backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Backend.service.QuestionGenerationService;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionGenerationService questionService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadAndGenerate(@RequestParam("file") MultipartFile file,
                                               @RequestParam("difficulty") String level,
                                               @RequestParam("email") String email,
                                               @RequestParam("sessionId") String sessionId) {
        try {
            String questions = questionService.generateQuestions(file, level, email, sessionId);

            return ResponseEntity.ok(
                Map.of(
                    "sessionId", sessionId,
                    "questions", questions
                )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                Map.of("error", e.getMessage())
            );
        }
    }

    @GetMapping("/new-set/{sessionId}")
    public ResponseEntity<?> generateNewSet(@PathVariable String sessionId,
                                            @RequestParam("difficulty") String level) {
        try {
            String questions = questionService.generateNewSet(sessionId, level);

            return ResponseEntity.ok(
                Map.of(
                    "sessionId", sessionId,
                    "questions", questions
                )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                Map.of("error", e.getMessage())
            );
        }
    }
}

