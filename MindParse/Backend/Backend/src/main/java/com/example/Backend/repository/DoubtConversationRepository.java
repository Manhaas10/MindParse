package com.example.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.Backend.Model.DoubtConversation;

public interface DoubtConversationRepository extends JpaRepository<DoubtConversation, Long> {

    // Get all messages for a user
    List<DoubtConversation> findByEmail(String email);

    // Get all messages in a conversation (ordered by time)
    List<DoubtConversation> findByConversationIdOrderByTimestampAsc(String conversationId);

    // (Optional) Get all distinct conversations for a user
    List<DoubtConversation> findDistinctByEmail(String email);
}
