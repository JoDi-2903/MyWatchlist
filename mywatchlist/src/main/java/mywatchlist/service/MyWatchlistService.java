package mywatchlist.service;

import mywatchlist.model.dto.*;
import mywatchlist.model.hibernate.UserProfile;
import mywatchlist.model.hibernate.Watchlist;
import mywatchlist.model.hibernate.WatchlistEntry;
import mywatchlist.repository.TitleTypeRepo;
import mywatchlist.repository.UserAccountRepo;
import mywatchlist.repository.WatchlistEntryRepo;
import mywatchlist.repository.WatchlistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MyWatchlistService {

    private final UserAccountRepo userAccountRepo;
    private final TitleTypeRepo titleTypeRepo;
    private final WatchlistEntryRepo watchlistEntryRepo;
    private final WatchlistRepo watchlistRepo;

    @Autowired
    public MyWatchlistService(UserAccountRepo userAccountRepo, TitleTypeRepo titleTypeRepo,
                              WatchlistEntryRepo watchlistEntryRepo, WatchlistRepo watchlistRepo) {
        this.userAccountRepo = userAccountRepo;
        this.titleTypeRepo = titleTypeRepo;
        this.watchlistEntryRepo = watchlistEntryRepo;
        this.watchlistRepo = watchlistRepo;
    }

    public UserAccountDto getUsers(long id) {
        UserProfile userAccount = userAccountRepo.getById(id);
        UserAccountDto userAccountDto = new UserAccountDto();
        userAccountDto.setUsername(userAccount.getUsername());
        return userAccountDto;
    }

    public void registerUser(UserAccountDto userAccountDto) {
        UserProfile userAccount = new UserProfile();
        userAccount.setUsername(userAccountDto.getUsername());
        userAccount.setEmail(userAccountDto.getEmail());
        userAccount.setPrivateProfile(false);

        String hashedPw = BCrypt.hashpw(userAccountDto.getPassword(), BCrypt.gensalt());
        userAccount.setPassword(hashedPw);
        userAccountRepo.save(userAccount);
    }

    public boolean checkUserOrEmailExist(String email, String username) {
        boolean exist = false;
        List<UserProfile> userAccountList = userAccountRepo.findByEmailOrUsername(email, username);
        if (!userAccountList.isEmpty()) {
            exist = true;
        }
        return exist;
    }

    public boolean checkEmailExist(String email){
        return userAccountRepo.findByEmail(email).isPresent();
    }

    public boolean checkUsernameExist(String username) {
        return userAccountRepo.findByUsername(username).isPresent();
    }

    public boolean verifyPassword(String password, String username){
        UserProfile userAccount = userAccountRepo.findByUsername(username).orElseThrow(EntityNotFoundException::new);
        return BCrypt.checkpw(password,userAccount.getPassword());
    }

    public boolean validateUsername(String username) {
        String pattern = "^[A-Za-z0-9]{3,20}$";
        return username.matches(pattern);
    }

    public boolean validateEmail(String email) {
        String pattern = "^([A-Za-z0-9._+-]{2,20})+@([A-Za-z0-9]{2,20})+(.[A-Za-z]{2,4})$";
        return email.matches(pattern);
    }

    public boolean validatePassword(String password) {
        String pattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$";
        return password.matches(pattern);
    }

    public ProfileDto getProfile(String username) {
        UserProfile userAccount = userAccountRepo.findByUsername(username).orElseThrow(EntityNotFoundException::new);
        ProfileDto profileDto = new ProfileDto();
        profileDto.setPrivateProfile(userAccount.isPrivateProfile());
        profileDto.setUsername(userAccount.getUsername());

        if(!userAccount.isPrivateProfile()){
            List<Watchlist> watchlists = watchlistRepo.findAllByUserUserId(userAccount.getUserId());
            List<WatchlistDto> watchlistDtoList = new ArrayList<>();
            for (var watchlist : watchlists) {
                WatchlistDto watchlistDto = new WatchlistDto();
                watchlistDto.setWatchlistName(watchlist.getWatchlistName());
                watchlistDtoList.add(watchlistDto);

                List<WatchlistEntry> watchlistEntries = watchlistEntryRepo.findAllByWatchlistWatchlistId(watchlist.getWatchlistId());
                for (var entry : watchlistEntries) {
                    WatchlistEntryDto watchlistEntryDto = new WatchlistEntryDto();
                    watchlistEntryDto.setTitleId(entry.getTitleId());
                    watchlistDto.AddEntry(watchlistEntryDto); //todo
                }
            }
            profileDto.setWatchlistList(watchlistDtoList);
        }

        return profileDto;
    }


    public MyProfileDto getMyProfile(String username) {
        UserProfile userAccount = userAccountRepo.findByUsername(username).orElseThrow(EntityNotFoundException::new);
        List<Watchlist> watchlists = watchlistRepo.findAllByUserUserId(userAccount.getUserId());
        MyProfileDto profileDto = new MyProfileDto();
        profileDto.setPrivateProfile(userAccount.isPrivateProfile());
        profileDto.setEmail(userAccount.getEmail());
        profileDto.setUsername(userAccount.getUsername());

        List<WatchlistDto> watchlistDtoList = new ArrayList<>();
        for (var watchlist : watchlists) {
            WatchlistDto watchlistDto = new WatchlistDto();
            watchlistDto.setWatchlistName(watchlist.getWatchlistName());
            watchlistDtoList.add(watchlistDto);

            List<WatchlistEntry> watchlistEntries = watchlistEntryRepo.findAllByWatchlistWatchlistId(watchlist.getWatchlistId());

            for (var entry : watchlistEntries) {
                WatchlistEntryDto watchlistEntryDto = new WatchlistEntryDto();
                watchlistEntryDto.setTitleId(entry.getTitleId());
                watchlistDto.AddEntry(watchlistEntryDto); //todo
            }
        }
        profileDto.setWatchlistList(watchlistDtoList);
        return profileDto;
    }

    public UserSettingsDto getUserSettings(String username) {
        UserProfile userAccount = userAccountRepo.findByUsername(username).orElseThrow(EntityNotFoundException::new);
        UserSettingsDto userSettingsDto = new UserSettingsDto();
        userSettingsDto.setUsername(userAccount.getUsername());
        userSettingsDto.setEmail(userAccount.getEmail());
        userSettingsDto.setPrivateProfile(userAccount.isPrivateProfile());
        return userSettingsDto;
    }

    public List<WatchlistDto> test(String username){

        return null;
    }

    public void changeEmail(String email, String username) {
        userAccountRepo.updateEmail(email, getUserId(username));
    }

    public void changePrivateProfile(boolean privateProfile, String username) {
        userAccountRepo.updatePrivateProfile(privateProfile, getUserId(username));
    }

    public void changePassword(String password, String username) {
        String hashedPw = BCrypt.hashpw(password, BCrypt.gensalt());
        userAccountRepo.updatePassword(hashedPw, getUserId(username));
    }

    private long getUserId(String username){
        UserProfile userAccount = userAccountRepo.findByUsername(username).orElseThrow(EntityNotFoundException::new);
        return userAccount.getUserId();
    }
}
