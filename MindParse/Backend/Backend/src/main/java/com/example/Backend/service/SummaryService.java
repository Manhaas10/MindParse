package com.example.Backend.service;

import com.example.Backend.util.GeminiAPI;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;

@Service
public class SummaryService {

    private final GeminiAPI geminiAPI;

    public SummaryService(GeminiAPI geminiAPI) {
        this.geminiAPI = geminiAPI;
    }

    public String summarize(String inputText, String level) {
        String prompt = switch (level.toLowerCase()) {
            case "brief" -> "Summarize briefly: " + inputText;
            case "moderate" -> "Summarize with moderate detail: " + inputText;
            default -> "Summarize in detail: " + inputText;
        };
        

        return geminiAPI.generateSummary(prompt);
    }
}
