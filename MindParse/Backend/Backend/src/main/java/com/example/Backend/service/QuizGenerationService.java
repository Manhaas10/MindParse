package com.example.Backend.service;

import com.example.Backend.Model.Quiz;
import com.example.Backend.Model.QuizQuestion;
import com.example.Backend.repository.QuizRepository;
import com.example.Backend.repository.QuizQuestionRepository;
import com.example.Backend.util.GeminiAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuizGenerationService {

    @Autowired
    private FileProcessingService fileProcessor;

    @Autowired
    private GeminiAPI geminiAPI;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizQuestionRepository questionRepository;

    public List<QuizQuestion> generateQuiz(MultipartFile file, String level, String email) throws Exception {
        // Step 1: Extract text
        String extractedText = fileProcessor.extractText(file);
        String fileName = file.getOriginalFilename();

        // Step 2: Save quiz metadata
        Quiz quiz = new Quiz();
        quiz.setUserEmail(email);
        quiz.setFileName(fileName);
        quiz.setExtractedText(extractedText);
        quiz.setCreatedAt(Instant.now());
        quiz = quizRepository.save(quiz);

        // Step 3: Generate prompt and call Gemini
        String prompt = createPrompt(extractedText, level);
        String plainTextResponse = geminiAPI.generateSummary(prompt); // Return is plain text, not JSON

        // Step 4: Parse and save questions
        List<QuizQuestion> questions = parseAndSaveQuestions(plainTextResponse, quiz);
        return questions;
    }

    public String generateNewSet(Long quizId, String level) throws Exception {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        String prompt = createPrompt(quiz.getExtractedText(), level);
        String plainTextResponse = geminiAPI.generateSummary(prompt);

        List<QuizQuestion> questions = parseAndSaveQuestions(plainTextResponse, quiz);
        return "Generated " + questions.size() + " new quiz questions";
    }

    private String createPrompt(String content, String level) {
        return """
        Based on the following text, generate 10 %s-level multiple choice questions.
        Format each question exactly as:

        Question: <question text>
        A. <Option A>
        B. <Option B>
        C. <Option C>
        D. <Option D>
        Answer: <Correct Option Letter>

        Text:
        %s
        """.formatted(level, content);
    }

    private List<QuizQuestion> parseAndSaveQuestions(String fullText, Quiz quiz) {
        List<QuizQuestion> result = new ArrayList<>();

        String[] blocks = fullText.split("(?=Question:)");
        
        for (String block : blocks) {
            if (!block.trim().startsWith("Question:")) continue;

            try {
                
                String question = extractLine(block, "Question:");
           
                String optionA = extractLine(block, "A.");
                String optionB = extractLine(block, "B.");
                String optionC = extractLine(block, "C.");
                String optionD = extractLine(block, "D.");
                String answer = extractLine(block, "Answer:");

                QuizQuestion q = new QuizQuestion();
                q.setQuiz(quiz);
                q.setQuestion(question);
                q.setOptionA(optionA);
                q.setOptionB(optionB);
                q.setOptionC(optionC);
                q.setOptionD(optionD);
                q.setCorrectAnswer(answer.trim());
                
                result.add(questionRepository.save(q));
            } catch (Exception e) {
                System.err.println("Failed to parse block:\n" + block + "\nReason: " + e.getMessage());
            }
        }

        return result;
    }

    private String extractLine(String block, String prefix) {
        return block.lines()
                .filter(line -> line.trim().startsWith(prefix))
                .findFirst()
                .map(line -> line.substring(prefix.length()).trim())
                .orElseThrow(() -> new RuntimeException("Missing: " + prefix));
    }
}
