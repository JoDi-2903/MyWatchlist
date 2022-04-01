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

    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody UserAccountDto userAccountDto){
        myWatchlistService.registerUser(userAccountDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping(path = "/register/validateUsername/{username}")
    public ResponseEntity<String> validateUsername(@PathVariable String username){
        if(!myWatchlistService.validateUsername(username)){
            return new ResponseEntity<>("Only letters A-Z with at least 3 characters and numbers are allowed.", HttpStatus.BAD_REQUEST);
        }
        if(myWatchlistService.checkUsernameExist(username)){
            return new ResponseEntity<>("Username " + username + " is already used", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Username " + username + " meets all criteria", HttpStatus.OK);
    }



    @PostMapping("/login")
    public void loginUser(){

    }

}
