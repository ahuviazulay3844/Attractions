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
    private  int idComments;//ת"ז תגובה
    @JoinColumn(name="id_Attraction")
    private Attraction idAttraction;//,אטרקצ
    @JoinColumn(name="id_traveler")
    private Traveler traveler;//מטייל
    private  String content;//תגובת המטייל
    private LocalDate localDate;//תאריך תגובה

}
