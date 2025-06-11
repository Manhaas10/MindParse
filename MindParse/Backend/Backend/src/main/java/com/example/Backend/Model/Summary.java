package com.example.Backend.Model;

import java.time.Instant;

// import com.google.protobuf.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import lombok.*;
@Entity
@Table(name ="summaries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Summary {
    @Id
    @GeneratedValue
    private Long id;

    private String fileName;
    private String fileUrl;
    private String summaryLevel; // "Brief", "Moderate", "Detailed"

    @Lob
    private String summaryText;
    private String userEmail;
    private Instant createdAt = Instant.now();
}
