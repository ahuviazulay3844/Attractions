package com.example.attractionproject.Controller;
import com.example.attractionproject.Dto.CommentsDto;
import com.example.attractionproject.Repository.CommentsRepository;
import com.example.attractionproject.Repository.TravelerRepository;
import com.example.attractionproject.Service.MapStructMapper;
import com.example.attractionproject.model.Comments;
import com.example.attractionproject.model.Traveler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController//Controller
@RequestMapping("api/Comments")//API prefix
public class CommentsController {
    public final CommentsRepository commentsRepository;
    private final TravelerRepository travelerRepository;
    private  final MapStructMapper mapStructImp;

    @Autowired

    public CommentsController(CommentsRepository commentsRepository, TravelerRepository travelerRepository, MapStructMapper mapStructImp) {
        this.commentsRepository = commentsRepository;
        this.travelerRepository = travelerRepository;
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
    //returns comments for one attraction
    @GetMapping("/byAttraction/{id}")
    public List<Comments> GetByAttraction(@PathVariable int id)
    {
        return commentsRepository.findByIdAttraction_IdOrderByIdCommentsDesc(id);
    }
        //add comment
        @PostMapping("/add")
    public Comments Addcomments(@RequestBody Comments comments)
    {
        if(comments.getLocalDate()==null)
        {
            comments.setLocalDate(LocalDate.now());//comment date
        }
        if(comments.getRating() == null || comments.getRating() < 1 || comments.getRating() > 5)
        {
            comments.setRating(5);//default star rating
        }
        Comments newComments=commentsRepository.save(comments);
        return reloadComment(newComments.getIdComments());
    }
    private Comments reloadComment(int id) {
        Comments comment = commentsRepository.findById(id).orElse(null);
        if (comment != null && comment.getTraveler() != null) {
            Traveler fullTraveler = travelerRepository.findById(comment.getTraveler().getIdTraveler()).orElse(null);
            comment.setTraveler(fullTraveler);
        }
        return comment;
    }
    @PostMapping("/addDto")
    public CommentsDto AddcommentsDto(@RequestBody CommentsDto commentsDto)
    {
        Comments comments=mapStructImp.toComments(commentsDto);
        if(comments.getLocalDate()==null)
        {
            comments.setLocalDate(LocalDate.now());//comment date
        }
        if(comments.getRating() == null || comments.getRating() < 1 || comments.getRating() > 5)
        {
            comments.setRating(5);//default star rating
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
