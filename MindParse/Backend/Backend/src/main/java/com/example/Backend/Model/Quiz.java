package com.example.Backend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

// Import QuizQuestion if it exists in the same package or adjust the package as needed
import com.example.Backend.Model.QuizQuestion;

@Entity
@Table(name = "quizzes")    
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Lob
    private String fileUrl;

    @Lob
    private String extractedText;

    private String level; // "Easy", "Medium", "Hard"

    private String userEmail;

    private Instant createdAt;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuizQuestion> questions;
}
