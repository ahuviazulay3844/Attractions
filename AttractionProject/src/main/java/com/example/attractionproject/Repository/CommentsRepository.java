package com.example.attractionproject.Repository;

import com.example.attractionproject.model.Attraction;
import com.example.attractionproject.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository extends JpaRepository<Comments,Integer> {
}
