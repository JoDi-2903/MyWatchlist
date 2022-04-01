package mywatchlist.controller;

import mywatchlist.model.dto.UserAccountDto;
import mywatchlist.model.hibernate.UserAccount;
import mywatchlist.service.MyWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/mywatchlist")
public class MyWatchlistController {

    private final MyWatchlistService myWatchlistService;

    @Autowired
    public MyWatchlistController(MyWatchlistService myWatchlistService) {
        this.myWatchlistService = myWatchlistService;
    }

    //for testing
    @GetMapping(path = "/user/{userId}")
    public UserAccountDto test(@PathVariable long userId){
        return myWatchlistService.getUsers(userId);
    }

    @PostMapping()
    public ResponseEntity<?> registerUser(@RequestBody UserAccountDto userAccountDto){
        myWatchlistService.registerUser(userAccountDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public void loginUser(){

    }

}
