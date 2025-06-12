package com.example.Backend.controller;

import com.example.Backend.Model.Summary;
import com.example.Backend.repository.SummaryRepository;
import com.example.Backend.service.CloudinaryService;
import com.example.Backend.service.FileProcessingService;
import com.example.Backend.service.SummaryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/summarize")
@RequiredArgsConstructor
@Slf4j
public class SummarizerController {

    private final CloudinaryService cloudinaryService;
    private final FileProcessingService fileProcessingService;
    private final SummaryService summaryService;
    private final SummaryRepository summaryRepository;

    @PostMapping
    public ResponseEntity<?> summarizeFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("level") String level,
            @RequestParam("email") String userEmail) {

        try {
            // 1. Upload file to Cloudinary and get URL
            // String fileUrl = cloudinaryService.uploadFile(file);
            String fileUrl = file.getOriginalFilename();
            log.info("File uploaded to Cloudinary: {}", fileUrl);
            // 2. Extract text content from uploaded file
            String content = fileProcessingService.extractText(file);
            log.info("Extracted content length: {}", content.length());

            // 3. Generate summary using Gemini API
            String summaryText = summaryService.summarize(content, level);
            log.info("Generated summary of level '{}'", summaryText);

            // 4. Save summary metadata to database
            Summary summary = new Summary();
            summary.setFileName(file.getOriginalFilename());
            summary.setFileUrl(fileUrl);
            summary.setSummaryLevel(level);
            summary.setSummaryText(summaryText);
            summary.setCreatedAt(Instant.now());
            summary.setUserEmail(userEmail);

            Summary saved = summaryRepository.save(summary);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            log.error("Failed to process file", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<Summary>> getSummaryHistory(@RequestParam("email") String userEmail) {
        try {
            List<Summary> summaries = summaryRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
            return ResponseEntity.ok(summaries);
        } catch (Exception e) {
            log.error("Failed to fetch summary history for email: {}", userEmail, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
