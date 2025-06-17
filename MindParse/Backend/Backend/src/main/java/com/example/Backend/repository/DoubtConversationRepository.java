package com.example.Backend.repository;

import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import com.example.Backend.Model.DoubtConversation;

public interface DoubtConversationRepository extends JpaRepository<DoubtConversation, Long> {

    // Get all messages for a user
    List<DoubtConversation> findByEmail(String email);

    // Get all messages in a conversation (ordered by time)
    List<DoubtConversation> findByConversationIdOrderByTimestampAsc(String conversationId);

    // (Optional) Get all distinct conversations for a user
    List<DoubtConversation> findDistinctByEmail(String email);
    List<DoubtConversation> findByEmailOrderByTimestampDesc(String email);
 @Query("SELECT dc.conversationId " +
       "FROM DoubtConversation dc " +
       "WHERE dc.email = :email " +
       "GROUP BY dc.conversationId " +
       "ORDER BY MAX(dc.timestamp) DESC")
List<String> findLatestConversationIdsByEmail(@Param("email") String email, Pageable pageable);

// 2. All messages for those conversation IDs
@Query("SELECT dc FROM DoubtConversation dc " +
       "WHERE dc.email = :email AND dc.conversationId IN :conversationIds " +
       "ORDER BY dc.timestamp DESC")
List<DoubtConversation> findByEmailAndConversationIds(
    @Param("email") String email,
    @Param("conversationIds") List<String> conversationIds
);
    
}
