package com.example.Backend.Model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.*;

@Entity
@Table(name ="pdfquestions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PDFQuestionSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String userEmail;

    @Lob
    private String extractedText;
    @Lob
    private String questionsJson;
    private String level;
    private String sessionId;

    private LocalDateTime uploadedAt;
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuestionAnswerSet> questionSets = new ArrayList<>();


    // getters and setters
}
