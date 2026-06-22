package com.example.attractionproject.Controller;
import com.example.attractionproject.Dto.AttractionDto;
import com.example.attractionproject.Repository.AttractionRepository;
import com.example.attractionproject.Service.MapStructMapper;
import com.example.attractionproject.model.Attraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//Controller
@RequestMapping("api/Attraction")//API prefix
public class AttractionController {
    private  final AttractionRepository attractionRepository;
    private  final MapStructMapper mapStructImp;
    @Autowired

    public AttractionController(AttractionRepository attractionRepository,MapStructMapper mapStructImp) {
        this.attractionRepository = attractionRepository;
        this.mapStructImp=mapStructImp;
    }
    //returns list of attractions
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
    //add attraction
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
    //returns attraction by id
    @GetMapping("/get/{id}")
    public Attraction GetById(@PathVariable int id)
    {
        return attractionRepository.findById(id).orElse(null);
    }
    @GetMapping("/getDto/{id}")
    public AttractionDto GetByIdDto(@PathVariable int id)
    {
        return mapStructImp.toAttractionDto(attractionRepository.findById(id).orElse(null));
    }
    //update attraction
    @PutMapping("/update")
    public  Attraction UpdateAttraction(@RequestBody Attraction attraction)
    {
        Attraction updateAttraction=attractionRepository.save(attraction);
        return updateAttraction;
    }
    @PutMapping("/updateDto")
    public  AttractionDto UpdateAttractionDto(@RequestBody AttractionDto attractionDto)
    {
        Attraction attraction=mapStructImp.toAttraction(attractionDto);
        AttractionDto updateAttraction=mapStructImp.toAttractionDto(attractionRepository.save(attraction));
        return updateAttraction;
    }
    //delete attraction
    @DeleteMapping("/delete/{id}")
    public void DeleteAttraction(@PathVariable int id)
    {
        attractionRepository.deleteById(id);
    }
}
