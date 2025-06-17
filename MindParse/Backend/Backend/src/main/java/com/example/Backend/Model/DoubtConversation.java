package com.example.Backend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "doubt_conversations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoubtConversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String title;

    private String conversationId; // 🔑 Unique conversation grouping

    @Lob
    private String question;

    @Lob
    private String answer;

    private Instant timestamp; // 🔁 For ordering messages

}
