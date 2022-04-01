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

    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody UserAccountDto userAccountDto){
        if(!myWatchlistService.validateUsername(userAccountDto.getUsername())){
            return new ResponseEntity<>("Username does not meet the requirements", HttpStatus.BAD_REQUEST);
        }else if(!myWatchlistService.validateEmail(userAccountDto.getEmail())){
            return new ResponseEntity<>("Email does not meet the requirements", HttpStatus.BAD_REQUEST);
        }else if(!myWatchlistService.validatePassword(userAccountDto.getPassword())){
            return new ResponseEntity<>("Password does not meet the requirements", HttpStatus.BAD_REQUEST);
        }else if(myWatchlistService.checkUserOrEmailExist(userAccountDto.getEmail(), userAccountDto.getUsername())){
            return new ResponseEntity<>("Username or Email is already used", HttpStatus.BAD_REQUEST);
        }
        myWatchlistService.registerUser(userAccountDto);
        return new ResponseEntity<>("User was created", HttpStatus.CREATED);
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
