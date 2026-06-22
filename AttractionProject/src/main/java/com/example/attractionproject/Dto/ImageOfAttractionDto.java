package com.example.attractionproject.Dto;

import com.example.attractionproject.model.Attraction;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
    public class ImageOfAttractionDto {
    private int idImage;//image id
    private Attraction Attraction;//attraction id
    private byte[] arrId;//image byte array
}
