package com.example.attractionproject.Controller;
import com.example.attractionproject.Dto.TravelerDto;
import com.example.attractionproject.Repository.TravelerRepository;
import com.example.attractionproject.Service.MapStructMapper;
import com.example.attractionproject.model.Traveler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController//Controller
@RequestMapping("api/travel")//API prefix
public class TravelerController {
    public final TravelerRepository travelerRepository;
    private  final MapStructMapper mapStructImp;
@Autowired
    public TravelerController(TravelerRepository travelerRepository,MapStructMapper mapStructImp) {
        this.travelerRepository = travelerRepository;
        this.mapStructImp=mapStructImp;
    }
    //returns list of travelers
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
    //add traveler
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
    //returns traveler by id
    @GetMapping("/get/{id}")
    public Traveler GetById(@PathVariable int id)
    {
        return travelerRepository.findById(id).orElse(null);
    }
    @GetMapping("/getDto/{id}")
    public TravelerDto GetByIdDto(@PathVariable int id)
    {
        return mapStructImp.toTravelerDto(travelerRepository.findById(id).orElse(null));
    }
    //update traveler
    @PutMapping("/update")
    public Traveler UpdateTraveler(@RequestBody Traveler traveler)
    {
        Traveler updatetraveler=travelerRepository.save(traveler);
        return updatetraveler;
    }
    @PutMapping("/updateDto")
    public TravelerDto UpdateTravelerDto(@RequestBody TravelerDto traveler)
    {
        TravelerDto updatetraveler=mapStructImp.toTravelerDto(travelerRepository.save(mapStructImp.toTraveler(traveler)));
        return updatetraveler;
    }
    //delete traveler
    @DeleteMapping("/delete/{id}")
    public void DeleteTraveler(@PathVariable int id)
    {
        travelerRepository.deleteById(id);
    }
}
