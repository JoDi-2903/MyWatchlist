package mywatchlist.controller;

import com.google.gson.JsonObject;
import mywatchlist.model.dto.UserAccountDto;
import mywatchlist.model.dto.UserSettingsDto;
import mywatchlist.security.CustomUserDetailService;
import mywatchlist.service.MyWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


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
        if(myWatchlistService.checkUsernameExist(username)){
            resp.addProperty(jsonKey, "User does not exist");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/user/myprofile/{username}")
    @PreAuthorize("#username == authentication.name")
    public ResponseEntity<String> getMyProfile(@PathVariable String username){
        JsonObject resp = new JsonObject();

        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/user/settings/{username}")
    @PreAuthorize("#username == authentication.name")
    public UserSettingsDto getUserSettings(@PathVariable String username){
        JsonObject resp = new JsonObject();
        return myWatchlistService.getUserSettings(username);
    }

    @GetMapping("/hello/{username}")
    @PreAuthorize("#username == authentication.name")
    //@PreAuthorize("@customUserDetailService.test(#username)")
    public ResponseEntity<String> testEndpoint(@PathVariable String username){
        JsonObject resp = new JsonObject();
        resp.addProperty("response", "ddd");
        return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
    }

}
