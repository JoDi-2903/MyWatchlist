package mywatchlist.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import mywatchlist.model.dto.*;
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
    public ResponseEntity<String> registerUser(@RequestBody UserAccountDto userAccountDto) {
        JsonObject resp = new JsonObject();
        if (!myWatchlistService.validateUsername(userAccountDto.getUsername())) {
            resp.addProperty(jsonKey, "Username does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        } else if (!myWatchlistService.validateEmail(userAccountDto.getEmail())) {
            resp.addProperty(jsonKey, "Email does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        } else if (!myWatchlistService.validatePassword(userAccountDto.getPassword())) {
            resp.addProperty(jsonKey, "Password does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        } else if (myWatchlistService.checkUserOrEmailExist(userAccountDto.getEmail(), userAccountDto.getUsername())) {
            resp.addProperty(jsonKey, "Username or Email is already used");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
        myWatchlistService.registerUser(userAccountDto);
        resp.addProperty(jsonKey, "User was created");
        return new ResponseEntity<>(jsonKey, HttpStatus.CREATED);
    }

    @GetMapping(path = "/register/validateUsername/{username}")
    public ResponseEntity<String> validateUsername(@PathVariable String username) {
        JsonObject resp = new JsonObject();

        if (!myWatchlistService.validateUsername(username)) {
            resp.addProperty(jsonKey, "Only letters A-Z with at least 3 characters and numbers are allowed.");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
        if (myWatchlistService.checkUsernameExist(username)) {
            resp.addProperty(jsonKey, "Username is already used");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "Username meets all criteria");
        return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public void loginUser(@RequestBody UserAccountDto userAccountDto) {
        //todo user zurückgeben?
    }

    //todo auth raus machen
    @GetMapping("/user/profile/{username}")
    public ResponseEntity<String> getExternalUserProfile(@PathVariable String username) {
        JsonObject resp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
        if (myWatchlistService.checkUsernameExist(username)) {
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
    public MyProfileDto getMyProfile(@PathVariable String username) {
        return myWatchlistService.getMyProfile(username);
    }

    @GetMapping("/user/settings/{username}")
    @PreAuthorize("#username == authentication.name")
    public UserSettingsDto getUserSettings(@PathVariable String username) {
        return myWatchlistService.getUserSettings(username);
    }

    //todo return wert verbessern, kann schöner gemacht werden und nur einmal return
    @PutMapping("/user/changeEmail")
    @PreAuthorize("#changeUserSettingsDto.getUsername == authentication.name")
    public ResponseEntity<String> changeUserSettings(@RequestBody ChangeUserSettingsDto changeUserSettingsDto) {
        String email = changeUserSettingsDto.getEmail();
        String username = changeUserSettingsDto.getUsername();
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(username)) {
            if (myWatchlistService.validateEmail(email)) {
                if (!myWatchlistService.checkEmailExist(email)) {
                    myWatchlistService.changeEmail(email, username);
                    resp.addProperty(jsonKey, "Email got changed");
                    return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
                } else {
                    resp.addProperty(jsonKey, "Email already in use");
                    return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
                }
            } else {
                resp.addProperty(jsonKey, "Email does not meet the requirements");
                return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
            }
        } else {
            resp.addProperty(jsonKey, "User does not exist");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/user/changePassword")
    @PreAuthorize("#changePasswordDto.getUsername == authentication.name")
    public ResponseEntity<String> changePasswordSettings(@RequestBody ChangePasswordDto changePasswordDto) {
        String oldPassword = changePasswordDto.getOldPassword();
        String newPassword = changePasswordDto.getNewPassword();
        String username = changePasswordDto.getUsername();
        JsonObject resp = new JsonObject();

        if (myWatchlistService.checkUsernameExist(username)) {
            if (myWatchlistService.validatePassword(newPassword)) {
                if (myWatchlistService.verifyPassword(oldPassword, username)) {
                    myWatchlistService.changePassword(newPassword, username);
                    resp.addProperty(jsonKey, "Password got changed");
                    return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
                } else {
                    resp.addProperty(jsonKey, "Old password does not match");
                    return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
                }
            } else {
                resp.addProperty(jsonKey, "Password does not meet the requirements");
                return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
            }
        } else {
            resp.addProperty(jsonKey, "User does not exist");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/user/changePrivateProfile")
    @PreAuthorize("#changeUserSettingsDto.getUsername == authentication.name")
    public ResponseEntity<String> changePrivateProfile(@RequestBody ChangeUserSettingsDto changeUserSettingsDto) {
        String username = changeUserSettingsDto.getUsername();
        boolean privateProfile = changeUserSettingsDto.isPrivateProfile();
        JsonObject resp = new JsonObject();

        if (myWatchlistService.checkUsernameExist(username)) {
            myWatchlistService.changePrivateProfile(privateProfile, username);
            resp.addProperty(jsonKey, "The privat profile status was set to: " + privateProfile);
            return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
        } else {
            resp.addProperty(jsonKey, "User does not exist");
            return new ResponseEntity<>(resp.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    //Test endpoint
    @GetMapping("/hello/{username}")
    @PreAuthorize("#username == authentication.name")
    //@PreAuthorize("@customUserDetailService.test(#username)")
    public List<WatchlistDto> testEndpoint(@PathVariable String username) {
        JsonObject resp = new JsonObject();
        resp.addProperty("response", "ddd");
        //myWatchlistService.test(username);
        //return new ResponseEntity<WatchlistDto>(myWatchlistService.test(username), HttpStatus.OK);
        return myWatchlistService.test(username);
    }

}
