package com.example.attractionproject.Controller;
import com.example.attractionproject.Dto.CommentsDto;
import com.example.attractionproject.Repository.CommentsRepository;
import com.example.attractionproject.Service.MapStructMapper;
import com.example.attractionproject.model.Comments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//Controller
@RequestMapping("api/Comments")//הקידומת כדי שידע שמדובר בזה
public class CommentsController {
    public final CommentsRepository commentsRepository;
    private  final MapStructMapper mapStructImp;

    @Autowired

    public CommentsController(CommentsRepository commentsRepository,MapStructMapper mapStructImp) {
        this.commentsRepository = commentsRepository;
        this.mapStructImp=mapStructImp;
    }
    //מחזירה רשימת תגובות
        @GetMapping("/getAll")
        public List<Comments> GetAll()
        {
          return commentsRepository.findAll();
        }
    @GetMapping("/getAllDto")
    public List<CommentsDto> GetAllDto()
    {
        return mapStructImp.toListCommentsDto(commentsRepository.findAll());
    }
        //הוספת תגובה
        @PostMapping("/add")
    public Comments Addcomments(@RequestBody Comments comments)
    {
        Comments newComments=commentsRepository.save(comments);
        return newComments;
    }
    @PostMapping("/addDto")
    public CommentsDto AddcommentsDto(@RequestBody CommentsDto commentsDto)
    {
        CommentsDto newComments=(mapStructImp.toCommentsDto(commentsRepository.save(mapStructImp.toComments(commentsDto))));
        return newComments;
    }

}
