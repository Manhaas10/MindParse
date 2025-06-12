package com.example.Backend.service;

import com.example.Backend.util.GeminiAPI;
import org.springframework.stereotype.Service;

@Service
public class SummaryService {

    private final GeminiAPI geminiAPI;

    public SummaryService(GeminiAPI geminiAPI) {
        this.geminiAPI = geminiAPI;
    }

    public String summarize(String inputText, String level) {
        String prompt = switch (level.toLowerCase()) {
            case "brief" -> "Quick overview and key points,Summarize briefly : " + inputText;
            case "moderate" -> "Balanced summary with details,Summarize with moderate detail: " + inputText;
            default -> "Comprehensive analysis and insights,Summarize in detail: " + inputText;
        };
        

        return geminiAPI.generateSummary(prompt);
    }
}
