package com.example.Backend.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Component
public class GeminiAPI {

    @Value("${gemini.api.key}")
    private String apiKey;

    private String endpoint;

    @PostConstruct
    public void init() {
        endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
    }

    public String generateSummary(String promptText) {
        try {
            // Optional: Trim prompt if too long
            if (promptText.length() > 10000) {
                promptText = promptText.substring(0, 10000);
            }
            // promptText = "Whenever you want to show something in a new line, mention \\n.\n" + promptText;

            // Create JSON request body using Jackson
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode root = mapper.createObjectNode();
            ArrayNode contents = mapper.createArrayNode();
            ObjectNode content = mapper.createObjectNode();
            ArrayNode parts = mapper.createArrayNode();
            ObjectNode part = mapper.createObjectNode();

            part.put("text", promptText);
            parts.add(part);
            content.set("parts", parts);
            contents.add(content);
            root.set("contents", contents);

            String requestBody = mapper.writeValueAsString(root);

            // Build and send HTTP request
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(endpoint))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();

            // Parse Gemini API response
            JsonNode rootNode = mapper.readTree(responseBody);
            System.out.println("Gemini API response rootNode: " + rootNode.toPrettyString());
            JsonNode candidates = rootNode.path("candidates");

            if (!candidates.isArray() || candidates.isEmpty()) {
                return "No candidates returned from Gemini API.";
            }

            JsonNode partsNode = candidates.get(0).path("content").path("parts");
            if (!partsNode.isArray() || partsNode.isEmpty()) {
                return "No content parts found in Gemini API response.";
            }

            JsonNode textNode = partsNode.get(0).path("text");
            if (textNode.isMissingNode() || textNode.isNull()) {
                return "Summary text missing in response.";
            }
            System.err.println(("Generated summary: " + textNode.asText()));

            return textNode.asText();

        } catch (Exception e) {
            e.printStackTrace(); // Optional: Log error
            return "Error generating summary: " + e.getMessage();
        }
    }
     public String generateSummaryconv(List<String[]> conversationHistory) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode root = mapper.createObjectNode();
            ArrayNode contents = mapper.createArrayNode();

            for (String[] message : conversationHistory) {
                if (message.length != 2) continue; // Skip invalid entries

                String role = message[0];
                String text = message[1];

                ObjectNode messageNode = mapper.createObjectNode();
                messageNode.put("role", role);

                ArrayNode parts = mapper.createArrayNode();
                ObjectNode part = mapper.createObjectNode();
                part.put("text", text);
                parts.add(part);

                messageNode.set("parts", parts);
                contents.add(messageNode);
            }

            root.set("contents", contents);
            String requestBody = mapper.writeValueAsString(root);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(endpoint))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();

            // Debug log

            // Parse Gemini API response
            JsonNode rootNode = mapper.readTree(responseBody);
            JsonNode candidates = rootNode.path("candidates");

            if (!candidates.isArray() || candidates.isEmpty()) {
                return "Service unavailable";
            }

            JsonNode partsNode = candidates.get(0).path("content").path("parts");
            if (!partsNode.isArray() || partsNode.isEmpty()) {
                return "Service unavailable";
            }

            JsonNode textNode = partsNode.get(0).path("text");
            if (textNode.isMissingNode() || textNode.isNull()) {
                return "Service unavailable";
            }

            return textNode.asText();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating summary: " + e.getMessage();
        }
    }
}
