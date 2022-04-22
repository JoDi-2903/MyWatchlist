package mywatchlist.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import mywatchlist.model.dto.MyProfileDto;
import mywatchlist.model.dto.UserAccountDto;
import mywatchlist.model.dto.UserSettingsDto;
import mywatchlist.model.dto.WatchlistDto;
import mywatchlist.security.CustomUserDetailService;
import mywatchlist.service.MyWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/mywatchlist")
public class MyWatchlistController {

    private final MyWatchlistService myWatchlistService;
    private final String jsonKey = "response";
    private CustomUserDetailService customUserDetailService;

    @Autowired
    public MyWatchlistController(MyWatchlistService myWatchlistService, CustomUserDetailService customUserDetailService) {
        this.myWatchlistService = myWatchlistService;
        this.customUserDetailService = customUserDetailService;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody UserAccountDto userAccountDto){
        JsonObject resp = new JsonObject();
        if(!myWatchlistService.validateUsername(userAccountDto.getUsername())){
            resp.addProperty(jsonKey, "Username does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }else if(!myWatchlistService.validateEmail(userAccountDto.getEmail())){
            resp.addProperty(jsonKey, "Email does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }else if(!myWatchlistService.validatePassword(userAccountDto.getPassword())){
            resp.addProperty(jsonKey, "Password does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }else if(myWatchlistService.checkUserOrEmailExist(userAccountDto.getEmail(), userAccountDto.getUsername())){
            resp.addProperty(jsonKey, "Username or Email is already used");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
        myWatchlistService.registerUser(userAccountDto);
        resp.addProperty(jsonKey, "User was created");
        return new ResponseEntity<>(jsonKey, HttpStatus.CREATED);
    }

    @GetMapping(path = "/register/validateUsername/{username}")
    public ResponseEntity<String> validateUsername(@PathVariable String username){
        JsonObject resp = new JsonObject();

        if(!myWatchlistService.validateUsername(username)){
            resp.addProperty(jsonKey, "Only letters A-Z with at least 3 characters and numbers are allowed.");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
        if(myWatchlistService.checkUsernameExist(username)){
            resp.addProperty(jsonKey, "Username is already used");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "Username meets all criteria");
        return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public void loginUser(@RequestBody UserAccountDto userAccountDto){
        //todo user zurückgeben?
    }

    //todo auth raus machen
    @GetMapping("/user/profile/{username}")
    public ResponseEntity<String> getExternalUserProfile(@PathVariable String username){
        JsonObject resp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
        if(myWatchlistService.checkUsernameExist(username)){
            Gson gson = new Gson();
            String profile = gson.toJson(myWatchlistService.getProfile(username));
            resp.addProperty(jsonKey, gson.toJson(myWatchlistService.getProfile(username)));
            return new ResponseEntity<>(profile, responseHeaders, HttpStatus.OK);

        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/user/myprofile/{username}")
    @PreAuthorize("#username == authentication.name")
    public MyProfileDto getMyProfile(@PathVariable String username){
        return  myWatchlistService.getMyProfile(username);
    }

    @GetMapping("/user/settings/{username}")
    @PreAuthorize("#username == authentication.name")
    public UserSettingsDto getUserSettings(@PathVariable String username){
        return myWatchlistService.getUserSettings(username);
    }

    //Test endpoint
    @GetMapping("/hello/{username}")
    @PreAuthorize("#username == authentication.name")
    //@PreAuthorize("@customUserDetailService.test(#username)")
    public List<WatchlistDto> testEndpoint(@PathVariable String username){
        JsonObject resp = new JsonObject();
        resp.addProperty("response", "ddd");
        //myWatchlistService.test(username);
        //return new ResponseEntity<WatchlistDto>(myWatchlistService.test(username), HttpStatus.OK);
        return myWatchlistService.test(username);
    }

}
