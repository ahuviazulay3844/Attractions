package com.example.attractionproject.Controller;
import com.example.attractionproject.Dto.ImageOfAttractionDto;
import com.example.attractionproject.Repository.ImageOfAttractionRepository;
import com.example.attractionproject.Service.MapStructMapper;
import com.example.attractionproject.model.ImageOfAttraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
@RestController//Controller
@RequestMapping("api/imageAttr")//API prefix
public class ImageOfAttractionController {
    public  final ImageOfAttractionRepository imageOfAttractionRepository;
    private  final MapStructMapper mapStructImp;
    private String directory = System.getProperty("user.dir") + "\\images\\";
    @Autowired
    public ImageOfAttractionController(ImageOfAttractionRepository imageOfAttractionRepository,MapStructMapper mapStructImp) {
        this.imageOfAttractionRepository = imageOfAttractionRepository;
        this.mapStructImp=mapStructImp;
    }
    //returns list of attraction images
    @GetMapping("/getAll")
    public List<ImageOfAttraction> GetAll()
    {
        return imageOfAttractionRepository.findAll();
    }
    @GetMapping("/getAllDto")
    public List<ImageOfAttractionDto> GetAllDto() throws IOException
    {
        return mapStructImp.toListImageOfAttractionDto(imageOfAttractionRepository.findAll());
    }
    //add image to attraction
    @PostMapping("/add")
    public ImageOfAttraction AddimageOfAttraction(@RequestBody ImageOfAttraction imageOfAttraction)
    {
        ImageOfAttraction newimageOfAttraction=imageOfAttractionRepository.save(imageOfAttraction);
        return newimageOfAttraction;
    }
    @PostMapping("/addDto")
    public ResponseEntity<ImageOfAttractionDto> AddimageOfAttractionDto(@RequestPart("file") MultipartFile file, @RequestPart("product") ImageOfAttractionDto imageOfAttractionDto) throws IOException
    {
        Files.createDirectories(Paths.get(this.directory));//creates images folder if it does not exist
        String var10000 = this.directory;//full path including images folder
        String dir = var10000 + file.getOriginalFilename();//adds the file name
        Path path = Paths.get(dir);//full path saved in variable
        Files.write(path, file.getBytes());//writes image bytes to file
        ImageOfAttraction  imageOfAttraction = this.mapStructImp.toImageOfAttraction(imageOfAttractionDto);
        imageOfAttraction.setImg(file.getOriginalFilename());//sets image file name
        ImageOfAttraction saved=imageOfAttractionRepository.save(imageOfAttraction);
        ImageOfAttractionDto newimageOfAttraction=(mapStructImp.toImageOfAttractionDto(saved));
        return new ResponseEntity(newimageOfAttraction, HttpStatus.CREATED);//returns response
    }
    //returns image by id
    @GetMapping("/get/{id}")
    public ImageOfAttraction GetById(@PathVariable int id)
    {
        return imageOfAttractionRepository.findById(id).orElse(null);
    }
    @GetMapping("/getDto/{id}")
    public ImageOfAttractionDto GetByIdDto(@PathVariable int id) throws IOException
    {
        return mapStructImp.toImageOfAttractionDto(imageOfAttractionRepository.findById(id).orElse(null));
    }
    //update image
    @PutMapping("/update")
    public ImageOfAttraction UpdateimageOfAttraction(@RequestBody ImageOfAttraction imageOfAttraction)
    {
        ImageOfAttraction updateimageOfAttraction=imageOfAttractionRepository.save(imageOfAttraction);
        return updateimageOfAttraction;
    }
    @PutMapping("/updateDto")
    public ImageOfAttractionDto UpdateimageOfAttractionDto(@RequestBody ImageOfAttractionDto imageOfAttractionDto) throws IOException
    {
        ImageOfAttractionDto updateimageOfAttraction=(mapStructImp.toImageOfAttractionDto(imageOfAttractionRepository.save(mapStructImp.toImageOfAttraction(imageOfAttractionDto))));
        return updateimageOfAttraction;
    }
    //delete image
    @DeleteMapping("/delete/{id}")
    public void DeleteimageOfAttraction(@PathVariable int id)
    {
        imageOfAttractionRepository.deleteById(id);
    }
}
