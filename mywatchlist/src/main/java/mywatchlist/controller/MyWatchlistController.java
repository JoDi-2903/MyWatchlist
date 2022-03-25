package mywatchlist.controller;

import mywatchlist.service.MyWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/myWatchList")
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


}
