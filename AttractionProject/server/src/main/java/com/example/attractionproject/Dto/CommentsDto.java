package com.example.attractionproject.Dto;

import com.example.attractionproject.model.Attraction;
import com.example.attractionproject.model.Traveler;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
@Getter
@Setter
public class CommentsDto {
    private  int idComments;//comment id
    @JoinColumn(name="id_Attraction")
    private Attraction idAttraction;//attraction
    @JoinColumn(name="id_traveler")
    private Traveler traveler;//traveler
    private  String content;//traveler comment
    private Integer rating;//star rating 1-5
    private LocalDate localDate;//comment date

}
