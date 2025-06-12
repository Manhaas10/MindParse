package com.example.Backend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "qa_sets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class QuestionAnswerSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String difficulty;

    @Lob
    private String questionsJson;  // Store as stringified JSON or structured format

    private LocalDateTime generatedAt;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private PDFQuestionSession session;
}
