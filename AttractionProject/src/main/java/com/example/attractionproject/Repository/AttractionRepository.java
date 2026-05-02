package com.example.attractionproject.Repository;
import com.example.attractionproject.model.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;


public interface  AttractionRepository extends JpaRepository<Attraction,Integer>{
}
