package com.example.Backend.controller;

import com.example.Backend.Model.DoubtConversation;
import com.example.Backend.service.DoubtSolverService;
import com.example.Backend.service.FileProcessingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/doubt")
public class DoubtSolverController {

    @Autowired
    private DoubtSolverService doubtService;

    @Autowired
    private FileProcessingService fileProcessor;

    // 🤖 Ask a doubt under a conversation
    @PostMapping("/ask")
    public ResponseEntity<String> askDoubt(@RequestParam String email,
                                           @RequestParam String question,
                                           @RequestParam String conversationId) {
        try {
        
            String answer = doubtService.solveDoubt(email, question, conversationId);
            return ResponseEntity.ok(answer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // 📜 Get full conversation by ID
    @GetMapping("/history/{conversationId}")
    public ResponseEntity<List<DoubtConversation>> getConversation(@PathVariable String conversationId) {
        try {
            List<DoubtConversation> history = doubtService.getConversationHistory(conversationId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 📚 Get all doubts by user
    @GetMapping("/history")
    public ResponseEntity<List<DoubtConversation>> getHistory(@RequestParam String email) {
        return ResponseEntity.ok(doubtService.getAllUserMessages(email));
    }

    // 📂 Start conversation based on uploaded file content
    @PostMapping("/upload")
    public ResponseEntity<String> uploadAndStartConversation(@RequestParam MultipartFile file,
                                                             @RequestParam String email,
                                                             @RequestParam String conversationId) {
        try {
            String text = fileProcessor.extractText(file);
            String prompt = "Based on the following content, explain the main concepts:\n" + text;

            String answer = doubtService.solveDoubt(email, prompt, conversationId);
            return ResponseEntity.ok("Conversation started. Initial response:\n\n" + answer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process file: " + e.getMessage());
        }
    }
}
