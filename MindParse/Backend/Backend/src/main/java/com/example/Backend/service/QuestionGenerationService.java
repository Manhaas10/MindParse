package com.example.Backend.service;

import com.example.Backend.Model.PDFQuestionSession;
import com.example.Backend.Model.QuestionAnswerSet;
import com.example.Backend.repository.PDFQuestionSessionRepository;
import com.example.Backend.repository.QuestionAnswerSetRepository;
import com.example.Backend.util.GeminiAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuestionGenerationService {

    @Autowired
    private FileProcessingService fileProcessingService;

    @Autowired
    private PDFQuestionSessionRepository sessionRepo;

    @Autowired
    private QuestionAnswerSetRepository qaSetRepo;

    @Autowired
    private GeminiAPI geminiAPI;

    public String generateQuestions(MultipartFile file, String difficulty, String userEmail, String sessionId) throws Exception {
        String extractedText = fileProcessingService.extractText(file);

        // Store session (linked by client-provided sessionId)
        PDFQuestionSession session = new PDFQuestionSession();
        session.setFileName(file.getOriginalFilename());
        session.setExtractedText(extractedText);
        session.setUserEmail(userEmail);
        session.setUploadedAt(LocalDateTime.now());
        session.setSessionId(sessionId);
        sessionRepo.save(session);

        String prompt = createFullPrompt(extractedText, difficulty);
        String questions = geminiAPI.generateSummary(prompt);

        // Track the first batch of questions
        QuestionAnswerSet qaSet = new QuestionAnswerSet();
        qaSet.setQuestionsJson(questions);
        qaSet.setDifficulty(difficulty);
        qaSet.setGeneratedAt(LocalDateTime.now());
        qaSet.setSession(session);
        qaSetRepo.save(qaSet);

        return questions;
    }

    public String generateNewSet(String sessionId, String difficulty) {
        List<PDFQuestionSession> sessions = sessionRepo.findBySessionId(sessionId);
        if (sessions == null || sessions.isEmpty()) {
            throw new RuntimeException("Session not found: " + sessionId);
        }

        PDFQuestionSession session = sessions.get(0);

        // Use smaller prompt for generating additional questions
        String prompt = createSmallPrompt(session.getExtractedText(), difficulty);
        String questions = geminiAPI.generateSummary(prompt);

        QuestionAnswerSet qaSet = new QuestionAnswerSet();
        qaSet.setQuestionsJson(questions);
        qaSet.setDifficulty(difficulty);
        qaSet.setGeneratedAt(LocalDateTime.now());
        qaSet.setSession(session);
        qaSetRepo.save(qaSet);

        return questions;
    }

    // Full prompt for initial batch (5–10 Qs)
    private String createFullPrompt(String content, String level) {
        return """
            Based on the following text, generate %s-level question and answer pairs.

            Output format must be strictly:
            Q1: <question>
            A1: <answer>

            Q2: <question>
            A2: <answer>

            Guidelines:
            - Provide 5 to 10 question-answer pairs depending on the content
            - Each answer should be accurate and concise
            - Match the difficulty level: %s
            - Questions must be relevant and derived strictly from the provided text

            Text:
            %s
            """.formatted(level, level, content);
    }

    // Smaller prompt for follow-up batches (3–4 new Qs)
    private String createSmallPrompt(String content, String level) {
        return """
            Based on the following text, generate 3 to 4 new %s-level question and answer pairs that are different from the previous ones.

            Output format must be strictly:
            Q1: <question>
            A1: <answer>

            Q2: <question>
            A2: <answer>

            Guidelines:
            - Ensure these are new questions not already covered
            - Keep answers concise and relevant
            - Match the difficulty level: %s

            Text:
            %s
            """.formatted(level, level, content);
    }
}
