package com.example.Backend.service;

import com.example.Backend.Model.DoubtConversation;
import com.example.Backend.repository.DoubtConversationRepository;
import com.example.Backend.util.GeminiAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DoubtSolverService {

    @Autowired
    private DoubtConversationRepository conversationRepository;

    @Autowired
    private GeminiAPI geminiAPI;

    // 🔄 Solve a doubt and save it under a conversationId
    public String solveDoubt(String email, String question, String conversationId,String title) {
    List<DoubtConversation> previous = conversationRepository.findByConversationIdOrderByTimestampAsc(conversationId);

    List<String[]> conversation = new ArrayList<>();
    for (DoubtConversation msg : previous) {
        conversation.add(new String[]{"user", msg.getQuestion()});
        conversation.add(new String[]{"model", msg.getAnswer()});
    }

    // Add current question
    conversation.add(new String[]{"user", question});


    String answer = geminiAPI.generateSummaryconv(conversation);
    System.err.println("Generated answer: " + answer);
    if(answer == null || answer.isEmpty()) {
        throw new RuntimeException("Failed to generate an answer from the model.");
    }
    DoubtConversation convo = DoubtConversation.builder()
            .email(email)
            .question(question)
            .answer(answer)
            .conversationId(conversationId)
            .timestamp(Instant.now())
            .title(title)
            .build();

    conversationRepository.save(convo);
    return answer;
    
}
public List<DoubtConversation> getLastTwoConversationsByEmail(String email) {
        // Step 1: Get latest 2 conversation IDs
        List<String> conversationIds = conversationRepository.findLatestConversationIdsByEmail(email, PageRequest.of(0, 2));

        // Step 2: If none found, return empty
        if (conversationIds.isEmpty()) {
            return Collections.emptyList();
        }

        // Step 3: Get all messages of those conversation IDs
        return conversationRepository.findByEmailAndConversationIds(email, conversationIds);
    }

    // 📜 Fetch all messages for a conversation
    public List<DoubtConversation> getConversationHistory(String conversationId) {
        return conversationRepository.findByConversationIdOrderByTimestampAsc(conversationId);
    }

    // 📚 Fetch all conversations by a user (optional)
    public List<DoubtConversation> getAllUserMessages(String email) {
        return conversationRepository.findByEmail(email);
    }
}
