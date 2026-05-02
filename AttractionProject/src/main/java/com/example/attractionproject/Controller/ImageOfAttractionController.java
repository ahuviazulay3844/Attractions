package com.example.attractionproject.Controller;
import com.example.attractionproject.Dto.ImageOfAttractionDto;
import com.example.attractionproject.Repository.ImageOfAttractionRepository;
import com.example.attractionproject.Service.MapStructMapper;
import com.example.attractionproject.model.ImageOfAttraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController//Controller
@RequestMapping("api/imageAttr")//הקידומת כדי שידע שמדובר בזה
public class ImageOfAttractionController {
    public  final ImageOfAttractionRepository imageOfAttractionRepository;
    private  final MapStructMapper mapStructImp;
    private String directory = System.getProperty("user.dir") + "\\images\\";
    @Autowired
    public ImageOfAttractionController(ImageOfAttractionRepository imageOfAttractionRepository,MapStructMapper mapStructImp) {
        this.imageOfAttractionRepository = imageOfAttractionRepository;
        this.mapStructImp=mapStructImp;
    }
    //מחזירה רשימת תמונות של האטרקציות
    @GetMapping("/getAll")
    public List<ImageOfAttraction> GetAll()
    {
        return imageOfAttractionRepository.findAll();
    }
    @GetMapping("/getAllDto")
    public List<ImageOfAttractionDto> GetAllDto()
    {
        return mapStructImp.toListImageOfAttractionDto(imageOfAttractionRepository.findAll());
    }
    //הוספת תמונה לאטרקציה
    @PostMapping("/add")
    public ImageOfAttraction AddimageOfAttraction(@RequestBody ImageOfAttraction imageOfAttraction)
    {
        ImageOfAttraction newimageOfAttraction=imageOfAttractionRepository.save(imageOfAttraction);
        return newimageOfAttraction;
    }
    @PostMapping("/addDto")
    public ResponseEntity<ImageOfAttractionDto> AddimageOfAttractionDto(@RequestPart("file") MultipartFile file, @RequestPart("product") ImageOfAttractionDto imageOfAttractionDto) throws IOException
    {
        String var10000 = this.directory;//כל הניתוב כולל תיקית התמונות
        String dir = var10000 + file.getOriginalFilename();//מוסיפה את שם הקובץ שבה התמונה
        Path path = Paths.get(dir);//ניתוב כללי על הכל ושמירה במשתנה
        Files.write(path, file.getBytes(), new OpenOption[0]);//?כותבת לקובץ מכניסה לו את התמונה בביטים
        ImageOfAttraction  imageOfAttraction = this.mapStructImp.toImageOfAttraction(imageOfAttractionDto);
        imageOfAttraction.setImg(file.getOriginalFilename());//בDTO שמה את היצוג של התמונה בביטים
        ImageOfAttractionDto newimageOfAttraction=(mapStructImp.toImageOfAttractionDto(imageOfAttractionRepository.save( mapStructImp.toImageOfAttraction(imageOfAttractionDto))));
        return new ResponseEntity(newimageOfAttraction, HttpStatus.CREATED);//ומחזירה
    }
}