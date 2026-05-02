package com.example.attractionproject.Dto;

import com.example.attractionproject.model.Attraction;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
    public class ImageOfAttractionDto {
    private int idImage;//תז אטרקציה
    private Attraction Attraction;//תז אטרקציה
    private byte[] arrId;//תמונה מערך
}
