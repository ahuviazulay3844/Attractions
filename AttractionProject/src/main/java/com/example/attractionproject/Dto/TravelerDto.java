package com.example.attractionproject.Dto;

import com.example.attractionproject.model.Comments;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class TravelerDto {
    private int idTraveler;//traveler id
    private String nameOfTraveler;//traveler name
    private String emailOfTraveler;//traveler email
    private int ageOfTraveler;//traveler age
}
