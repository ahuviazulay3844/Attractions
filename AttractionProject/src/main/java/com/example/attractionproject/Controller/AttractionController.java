package com.example.attractionproject.Controller;
import com.example.attractionproject.Dto.AttractionDto;
import com.example.attractionproject.Repository.AttractionRepository;
import com.example.attractionproject.Service.MapStructMapper;
import com.example.attractionproject.model.Attraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//Controller
@RequestMapping("api/Attraction")//הקידומת כדי שידע שמדובר בזה
public class AttractionController {
    private  final AttractionRepository attractionRepository;
    private  final MapStructMapper mapStructImp;
    @Autowired

    public AttractionController(AttractionRepository attractionRepository,MapStructMapper mapStructImp) {
        this.attractionRepository = attractionRepository;
        this.mapStructImp=mapStructImp;
    }
    //מחזירה רשימת אטרקציות
    @GetMapping("/getAll")
    public List<Attraction> GetAll()
    {
        return attractionRepository.findAll();
    }
    @GetMapping("/getAllDto")
    public List<AttractionDto> GetAllDto()
    {
        return mapStructImp.toListAttractionDto(attractionRepository.findAll());
    }
    //הוספת אטרקציה
 @PostMapping("/add")
    public  Attraction AddAttraction(@RequestBody Attraction attraction)
    {
        Attraction newAttraction=attractionRepository.save(attraction);
        return newAttraction;
    }
    @PostMapping("/addDto")
    public  AttractionDto AddAttractionDto(@RequestBody AttractionDto attractionDto)
    {
Attraction attraction=mapStructImp.toAttraction(attractionDto);
        AttractionDto newAttraction=mapStructImp.toAttractionDto(attractionRepository.save(attraction));
        return newAttraction;
    }
}
