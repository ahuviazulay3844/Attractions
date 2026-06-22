package com.example.attractionproject.Repository;

import com.example.attractionproject.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments,Integer> {
    List<Comments> findByIdAttraction_IdOrderByIdCommentsDesc(int attractionId);
}
