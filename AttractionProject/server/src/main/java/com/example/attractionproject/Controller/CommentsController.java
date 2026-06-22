package com.example.attractionproject.Controller;
import com.example.attractionproject.Dto.CommentsDto;
import com.example.attractionproject.Repository.CommentsRepository;
import com.example.attractionproject.Service.MapStructMapper;
import com.example.attractionproject.model.Comments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController//Controller
@RequestMapping("api/Comments")//API prefix
public class CommentsController {
    public final CommentsRepository commentsRepository;
    private  final MapStructMapper mapStructImp;

    @Autowired

    public CommentsController(CommentsRepository commentsRepository,MapStructMapper mapStructImp) {
        this.commentsRepository = commentsRepository;
        this.mapStructImp=mapStructImp;
    }
    //returns list of comments
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
        //add comment
        @PostMapping("/add")
    public Comments Addcomments(@RequestBody Comments comments)
    {
        if(comments.getLocalDate()==null)
        {
            comments.setLocalDate(LocalDate.now());//comment date
        }
        Comments newComments=commentsRepository.save(comments);
        return newComments;
    }
    @PostMapping("/addDto")
    public CommentsDto AddcommentsDto(@RequestBody CommentsDto commentsDto)
    {
        Comments comments=mapStructImp.toComments(commentsDto);
        if(comments.getLocalDate()==null)
        {
            comments.setLocalDate(LocalDate.now());//comment date
        }
        CommentsDto newComments=(mapStructImp.toCommentsDto(commentsRepository.save(comments)));
        return newComments;
    }
    //returns comment by id
    @GetMapping("/get/{id}")
    public Comments GetById(@PathVariable int id)
    {
        return commentsRepository.findById(id).orElse(null);
    }
    @GetMapping("/getDto/{id}")
    public CommentsDto GetByIdDto(@PathVariable int id)
    {
        return mapStructImp.toCommentsDto(commentsRepository.findById(id).orElse(null));
    }
    //update comment
    @PutMapping("/update")
    public Comments Updatecomments(@RequestBody Comments comments)
    {
        Comments updateComments=commentsRepository.save(comments);
        return updateComments;
    }
    @PutMapping("/updateDto")
    public CommentsDto UpdatecommentsDto(@RequestBody CommentsDto commentsDto)
    {
        CommentsDto updateComments=(mapStructImp.toCommentsDto(commentsRepository.save(mapStructImp.toComments(commentsDto))));
        return updateComments;
    }
    //delete comment
    @DeleteMapping("/delete/{id}")
    public void Deletecomments(@PathVariable int id)
    {
        commentsRepository.deleteById(id);
    }

}
