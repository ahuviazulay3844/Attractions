package com.example.attractionproject.Controller;
import com.example.attractionproject.Dto.TravelerDto;
import com.example.attractionproject.Repository.TravelerRepository;
import com.example.attractionproject.Service.MapStructMapper;
import com.example.attractionproject.model.ImageOfAttraction;
import com.example.attractionproject.model.Traveler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController//Controller
@RequestMapping("api/travel")//הקידומת כדי שידע שמדובר בזה
public class TravelerController {
    public final TravelerRepository travelerRepository;
    private  final MapStructMapper mapStructImp;
@Autowired
    public TravelerController(TravelerRepository travelerRepository,MapStructMapper mapStructImp) {
        this.travelerRepository = travelerRepository;
        this.mapStructImp=mapStructImp;
    }
    //מחזירה רשימת מטילים
    @GetMapping("/getAll")
    public List<Traveler> GetAll()
    {
        return travelerRepository.findAll();
    }
    @GetMapping("/getAllDto")
    public List<TravelerDto> GetAllDto()
    {
        return mapStructImp.toListTravelerDto (travelerRepository.findAll());
    }
    //הוספת מטייל
    @PostMapping("/add")
    public Traveler AddTraveler(@RequestBody Traveler traveler)
    {
        Traveler newtraveler=travelerRepository.save(traveler);
        return newtraveler;
    }
    @PostMapping("/addDto")
    public TravelerDto AddTravelerDto(@RequestBody TravelerDto traveler)
    {
        TravelerDto newtraveler=mapStructImp.toTravelerDto(travelerRepository.save(mapStructImp.toTraveler(traveler)));
        return newtraveler;
    }
}
