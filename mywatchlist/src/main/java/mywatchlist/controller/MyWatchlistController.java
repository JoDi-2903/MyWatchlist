package mywatchlist.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import mywatchlist.model.Title;
import mywatchlist.model.dto.*;
import mywatchlist.service.MyWatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;


@RestController
@RequestMapping("api/v1/mywatchlist")
public class MyWatchlistController {

    private final MyWatchlistService myWatchlistService;
    private final String jsonKey = "response";
    private final HttpHeaders responseHeaders;

    @Autowired
    public MyWatchlistController(MyWatchlistService myWatchlistService) {
        this.myWatchlistService = myWatchlistService;
        responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
    }

    //region User

    /**
     * @param userAccountDto
     * @return
     */
    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody UserAccountDto userAccountDto) {
        JsonObject resp = new JsonObject();
        if (!myWatchlistService.validateUsername(userAccountDto.getUsername())) {
            resp.addProperty(jsonKey, "Username does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        if (!myWatchlistService.validateEmail(userAccountDto.getEmail())) {
            resp.addProperty(jsonKey, "Email does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        if (!myWatchlistService.validatePassword(userAccountDto.getPassword())) {
            resp.addProperty(jsonKey, "Password does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        if (myWatchlistService.checkUserOrEmailExist(userAccountDto.getEmail(), userAccountDto.getUsername())) {
            resp.addProperty(jsonKey, "Username or Email is already used");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        myWatchlistService.registerUser(userAccountDto);
        resp.addProperty(jsonKey, "User was created");
        return new ResponseEntity<>(resp.toString(), HttpStatus.CREATED);
    }

    /**
     *
     */
    @PostMapping("/login")
    public void loginUser() {
    }

    /**
     * @param username
     * @return
     */
    @GetMapping(path = "/register/validate-username/{username}")
    public ResponseEntity<String> validateUsername(@PathVariable String username) {
        JsonObject resp = new JsonObject();
        if (!myWatchlistService.validateUsername(username)) {
            resp.addProperty(jsonKey, "Only letters a-z, A-Z with at least 3 characters and numbers are allowed.");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        if (myWatchlistService.checkUsernameExist(username)) {
            resp.addProperty(jsonKey, "Username is already used");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "Username meets all criteria");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.OK);
    }

    /**
     * @param changeUserSettingsDto
     * @return
     */
    @PutMapping("/user/settings/change-private-profile")
    @PreAuthorize("#changeUserSettingsDto.getUsername == authentication.name")
    public ResponseEntity<String> changePrivateProfile(@RequestBody ChangeUserSettingsDto changeUserSettingsDto) {
        String username = changeUserSettingsDto.getUsername();
        boolean privateProfile = changeUserSettingsDto.isPrivateProfile();
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(username)) {
            myWatchlistService.changePrivateProfile(privateProfile, username);
            if (privateProfile) {
                resp.addProperty(jsonKey, "The privacy status was set to private");
            } else {
                resp.addProperty(jsonKey, "The privacy status was set to public");
            }
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.OK);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    /**
     * @param changePasswordDto
     * @return
     */
    @PutMapping("/user/settings/change-password")
    @PreAuthorize("#changePasswordDto.getUsername == authentication.name")
    public ResponseEntity<String> changePasswordSettings(@RequestBody ChangePasswordDto changePasswordDto) {
        JsonObject resp = new JsonObject();
        String oldPassword = changePasswordDto.getOldPassword();
        String newPassword = changePasswordDto.getNewPassword();
        String username = changePasswordDto.getUsername();
        if (myWatchlistService.checkUsernameExist(username)) {
            if (myWatchlistService.validatePassword(newPassword)) {
                if (myWatchlistService.verifyPassword(oldPassword, username)) {
                    myWatchlistService.changePassword(newPassword, username);
                    resp.addProperty(jsonKey, "Password got changed");
                    return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.OK);
                }
                resp.addProperty(jsonKey, "Old password does not match");
                return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
            }
            resp.addProperty(jsonKey, "Password does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    /**
     * @param changeUserSettingsDto
     * @return
     */
    @PutMapping("/user/settings/change-email")
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

    /**
     * @param username
     * @return
     */
    @GetMapping("/user/settings/{username}")
    @PreAuthorize("#username == authentication.name")
    public UserSettingsDto getUserSettings(@PathVariable String username) {
        return myWatchlistService.getUserSettings(username);
    }

    /**
     * @param username
     * @return
     */
    @GetMapping("/user/my-profile/{username}")
    @PreAuthorize("#username == authentication.name")
    public MyProfileDto getMyProfile(@PathVariable String username) {
        return myWatchlistService.getMyProfile(username);
    }

    /**
     * @param username
     * @return
     */
    @GetMapping("/user/profile/{username}")
    public ResponseEntity<String> getExternalUserProfile(@PathVariable String username) {
        JsonObject resp = new JsonObject();
        Gson gson = new Gson();
        if (myWatchlistService.checkUsernameExist(username)) {
            String profile = gson.toJson(myWatchlistService.getProfile(username));
            resp.addProperty(jsonKey, gson.toJson(myWatchlistService.getProfile(username)));
            return new ResponseEntity<>(profile, responseHeaders, HttpStatus.OK);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    /**
     * @param username
     * @return
     */
    @DeleteMapping("/user/delete-user/{username}")
    @PreAuthorize("#username == authentication.name")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(username)) {
            myWatchlistService.deleteUser(username);
            resp.addProperty(jsonKey, "User successfully deleted");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.OK);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);

    }
    //endregion

    //region Watchlist

    /**
     * @param watchlistDto
     * @return
     */
    @PostMapping("/watchlist/new-watchlist")
    @PreAuthorize("#watchlistDto.getUsername == authentication.name")
    public ResponseEntity<String> changePrivateProfile(@RequestBody CreateUpdateWatchlistDto watchlistDto) {
        JsonObject resp = new JsonObject();
        String username = watchlistDto.getUsername();
        String watchlistName = watchlistDto.getWatchlistName();
        if (myWatchlistService.checkUsernameExist(username)) {
            if (!myWatchlistService.checkWatchlistName(watchlistName, username)) {
                myWatchlistService.createWatchlist(watchlistName, username);
                resp.addProperty(jsonKey, "New watchlist " + watchlistName + " was created");
                return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.CREATED);
            }
            resp.addProperty(jsonKey, "Watchlist name does not meet the requirements");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    /**
     * @param watchlistEntryDto Watchlist entry
     * @return
     */
    @PostMapping("/watchlist/add-new-watchlist-entry")
    @PreAuthorize("#watchlistEntryDto.getUsername == authentication.name")
    public ResponseEntity<String> addWatchlistEntry(@RequestBody AddWatchlistEntryDto watchlistEntryDto) {
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(watchlistEntryDto.getUsername())) {
            //Check TitleType has correct Enum Type
            if (Arrays.stream(Title.values()).anyMatch(x -> x.name().equals(watchlistEntryDto.getWatchlistEntry().getTitleType().toUpperCase()))) {
                if (myWatchlistService.checkWatchlistBelongsToUser(watchlistEntryDto.getWatchlistId(), watchlistEntryDto.getUsername())) {
                    Title title = Title.valueOf(watchlistEntryDto.getWatchlistEntry().getTitleType().toUpperCase());
                    if (title.equals(Title.MOVIE)) {
                        if (!myWatchlistService.checkTitleIdIsUsed(watchlistEntryDto.getWatchlistId(), watchlistEntryDto.getWatchlistEntry().getTitleId())) {
                            myWatchlistService.addWatchlistEntry(watchlistEntryDto);
                            resp.addProperty(jsonKey, "Entry was successfully entered");
                            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.CREATED);
                        }
                        resp.addProperty(jsonKey, "Movie title already added to the watchlist");
                        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
                    }
                    myWatchlistService.addWatchlistEntry(watchlistEntryDto);
                    resp.addProperty(jsonKey, "Entry was successfully entered");
                    return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.CREATED);
                }
                resp.addProperty(jsonKey, "Watchlist dont exist or belongs to the user");
                return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
            }
            resp.addProperty(jsonKey, "Title type must be Movie or Tv");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    //refactored mit nested test X
    @GetMapping("/watchlist/get-watchlist/{username}/{watchlistId}")
    @PreAuthorize("#username == authentication.name")
    public ResponseEntity<String> getWatchlist(@PathVariable String username, @PathVariable long watchlistId) {
        JsonObject resp = new JsonObject();
        if (!myWatchlistService.checkUsernameExist(username)) {
            resp.addProperty(jsonKey, "User does not exist");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        if (!myWatchlistService.checkWatchlistIdBelongsToUser(watchlistId, username)) {
            resp.addProperty(jsonKey, "Watchlist does not belong to the user or it does not exist");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        Gson gson = new Gson();
        String watchlist = gson.toJson(myWatchlistService.getWatchlist(watchlistId));
        return new ResponseEntity<>(watchlist, responseHeaders, HttpStatus.OK);
    }

    @GetMapping("/watchlist/get-every-watchlist/{username}")
    @PreAuthorize("#username == authentication.name")
    public ResponseEntity<String> getEveryWatchlist(@PathVariable String username) {
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(username)) {
            Gson gson = new Gson();
            String watchtlists = gson.toJson(myWatchlistService.getWatchlists(username));
            return new ResponseEntity<>(watchtlists, responseHeaders, HttpStatus.OK);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/watchlist/delete-watchlist-entry/{username}/{entryId}")
    @PreAuthorize("#username == authentication.name")
    public ResponseEntity<String> deleteWatchlistEntry(@PathVariable String username, @PathVariable long entryId) {
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(username)) {
            if (myWatchlistService.checkWatchlistEntryBelongsToUser(1, 2)) {
                myWatchlistService.deleteWatchlistEntry(entryId);
                resp.addProperty(jsonKey, "Successfully deleted the watchlist entry");
                return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.OK);
            }
            resp.addProperty(jsonKey, "The watchlist entry cannot be assigned to the user");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);

    }

    @DeleteMapping("/watchlist/delete-watchlist/{username}/{watchlistId}")
    @PreAuthorize("#username == authentication.name")
    public ResponseEntity<String> deleteWatchlist(@PathVariable String username, @PathVariable long watchlistId) {
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(username)) {
            if (myWatchlistService.checkWatchlistBelongsToUser(watchlistId, username)) {
                myWatchlistService.deleteWatchlist(watchlistId);
                resp.addProperty(jsonKey, "Successfully deleted the watchlist");
                return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
            }
            resp.addProperty(jsonKey, "The watchlist cannot be assigned to the user");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/watchlist/delete-episodes")
    @PreAuthorize("#deleteEpisodesDto.getUsername() == authentication.name")
    public ResponseEntity<String> deleteEpisode(@RequestBody DeleteEpisodesDto deleteEpisodesDto) {
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(deleteEpisodesDto.getUsername())) {
            if (!deleteEpisodesDto.getTvInfo().getEpisodes().isEmpty()) {
                if (myWatchlistService.checkWatchlistBelongsToUser(deleteEpisodesDto.getWatchlistId(), deleteEpisodesDto.getUsername())) {
                    if (myWatchlistService.checkWatchlistEntryBelongsToUser(deleteEpisodesDto.getTitleId(), deleteEpisodesDto.getWatchlistId())) {
                        myWatchlistService.deleteEpisodes(deleteEpisodesDto.getWatchlistId(), deleteEpisodesDto.getTitleId(), deleteEpisodesDto.getTvInfo());
                        resp.addProperty(jsonKey, "Episodes successfully deleted");
                        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.OK);
                    }
                    resp.addProperty(jsonKey, "The watchlist entry cannot be assigned to the user");
                    return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
                }
                resp.addProperty(jsonKey, "Watchlist dont exist or belongs to the user");
                return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
            }
            resp.addProperty(jsonKey, "Please specify the episodes to be deleted");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/watchlist/delete-seasons")
    @PreAuthorize("#deleteSeasonsDto.getUsername() == authentication.name")
    public ResponseEntity<String> deleteSeasons(@RequestBody DeleteSeasonsDto deleteSeasonsDto) {
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(deleteSeasonsDto.getUsername())) {
            if (deleteSeasonsDto.getSeasons().size() != 0) {
                if (myWatchlistService.checkWatchlistBelongsToUser(deleteSeasonsDto.getWatchlistId(), deleteSeasonsDto.getUsername())) {
                    if (myWatchlistService.checkWatchlistEntryBelongsToUser(deleteSeasonsDto.getTitleId(), deleteSeasonsDto.getWatchlistId())) {
                        myWatchlistService.deleteSeasons(deleteSeasonsDto.getWatchlistId(), deleteSeasonsDto.getTitleId(), deleteSeasonsDto.getSeasons());
                        resp.addProperty(jsonKey, "Seasons successfully deleted");
                        return new ResponseEntity<>(resp.toString(), HttpStatus.OK);
                    }
                    resp.addProperty(jsonKey, "The watchlist entry cannot be assigned to the user");
                    return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
                }
                resp.addProperty(jsonKey, "Watchlist dont exist or belongs to the user");
                return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
            }
            resp.addProperty(jsonKey, "Please specify the seasons to be deleted");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/watchlist/delete-complete-tv-or-movie")
    @PreAuthorize("#tvOrMovie.getUsername() == authentication.name")
    public ResponseEntity<String> deleteCompleteTvOrMovie(@RequestBody DeleteCompleteTvOrMovieDto tvOrMovie) {
        JsonObject resp = new JsonObject();
        if (myWatchlistService.checkUsernameExist(tvOrMovie.getUsername())) {
            if (myWatchlistService.checkWatchlistBelongsToUser(tvOrMovie.getWatchlistId(), tvOrMovie.getUsername())) {
                if (myWatchlistService.checkWatchlistEntryBelongsToUser(tvOrMovie.getTitleId(), tvOrMovie.getWatchlistId())) {
                    myWatchlistService.deleteCompleteTvOrMovie(tvOrMovie.getWatchlistId(), tvOrMovie.getTitleId());
                    resp.addProperty(jsonKey, "TV show or movie successfully deleted ");
                    return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.OK);
                }
                resp.addProperty(jsonKey, "The watchlist entry cannot be assigned to the user");
                return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
            }
            resp.addProperty(jsonKey, "Watchlist dont exist or belongs to the user");
            return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
        }
        resp.addProperty(jsonKey, "User does not exist");
        return new ResponseEntity<>(resp.toString(), responseHeaders, HttpStatus.BAD_REQUEST);
    }

    //endregion

}
