package com.example.attractionproject.Dto;

import com.example.attractionproject.model.Comments;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class TravelerDto {
    private int idTraveler;//ת"ז מטייל
    private String nameOfTraveler;//שם מטייל
    private String emailOfTraveler;//מייל מטייל
    private int ageOfTraveler;//גיל המטייל
}
