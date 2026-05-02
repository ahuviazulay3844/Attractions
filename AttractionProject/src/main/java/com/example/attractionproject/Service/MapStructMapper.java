package com.example.attractionproject.Service;

import ch.qos.logback.core.model.ComponentModel;
import com.example.attractionproject.Dto.AttractionDto;
import com.example.attractionproject.Dto.CommentsDto;
import com.example.attractionproject.Dto.ImageOfAttractionDto;
import com.example.attractionproject.Dto.TravelerDto;
import com.example.attractionproject.model.Attraction;
import com.example.attractionproject.model.Comments;
import com.example.attractionproject.model.ImageOfAttraction;
import com.example.attractionproject.model.Traveler;
import org.mapstruct.Mapper;

import javax.swing.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Mapper(componentModel = "spring")//משויך לspringboots
public interface MapStructMapper {
    //המרות
    Attraction toAttraction(AttractionDto attractionDto);

    AttractionDto toAttractionDto(Attraction attraction);

    List<Attraction> toListAttraction(List<Attraction> ListAttraction);

    List<AttractionDto> toListAttractionDto(List<Attraction> ListAttraction);

    CommentsDto toCommentsDto(Comments Comments);

    Comments toComments(CommentsDto CommentsDto);

    List<CommentsDto> toListCommentsDto(List<Comments> Comments);

    List<Comments> toListComments(List<CommentsDto> CommentsDto);

    List<TravelerDto> toListTravelerDto(List<Traveler> Traveler);

    List<Traveler> toListTraveler(List<TravelerDto> TravelerDto);

    List<ImageOfAttraction> toListImageOfAttraction(List<ImageOfAttractionDto> ImageOfAttractionDto);

    List<ImageOfAttractionDto> toListImageOfAttractionDto(List<ImageOfAttraction> ImageOfAttraction);

    TravelerDto toTravelerDto(Traveler Traveler);

    Traveler toTraveler(TravelerDto TravelerDto);

    default ImageOfAttractionDto toImageOfAttractionDto(ImageOfAttraction ImageOfAttraction) throws IOException {
        ImageOfAttractionDto imageOfAttractionDto = new ImageOfAttractionDto();
        imageOfAttractionDto.setAttraction(ImageOfAttraction.getAttraction());
        imageOfAttractionDto.setIdImage(ImageOfAttraction.getIdImage());
        String dir = System.getProperty("user.dir");//ניתוב עד הפרויקט הזה
        //מקבל מחרוזת והופך לניתוב
        Path fileUrl = Paths.get(dir + ImageOfAttraction.getImg());
        byte[] arr = Files.readAllBytes(fileUrl);// את התמונההופך לביטים
        imageOfAttractionDto.setArrId(arr);//שם בתוכו את התמונה בביטים
        return imageOfAttractionDto;//מחחזיר אותו
    }
//
    default ImageOfAttraction toImageOfAttraction(ImageOfAttractionDto ImageOfAttractionDto) {
        ImageOfAttraction imageOfAttraction = new ImageOfAttraction();
        imageOfAttraction.setAttraction(ImageOfAttractionDto.getAttraction());
        imageOfAttraction.setIdImage(ImageOfAttractionDto.getIdImage());
        return imageOfAttraction;
    }


}
