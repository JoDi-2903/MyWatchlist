package mywatchlist.controller;

import mywatchlist.model.dto.UserAccountDto;
import mywatchlist.service.MyWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/mywatchlist")
public class MyWatchlistController {

    private final MyWatchlistService myWatchlistService;

    @Autowired
    public MyWatchlistController(MyWatchlistService myWatchlistService) {
        this.myWatchlistService = myWatchlistService;
    }

    @GetMapping(path = "/user/{userId}")
    public void test(@PathVariable long userId){
        myWatchlistService.getUsers(userId);
    }

    @PostMapping()
    public void registerUser(@RequestBody UserAccountDto userAccountDto){
        myWatchlistService.registerUser(userAccountDto);
    }

    @PostMapping()
    public void loginUser(){

    }

}
