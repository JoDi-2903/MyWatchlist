package mywatchlist.service;

import mywatchlist.model.dto.UserAccountDto;
import mywatchlist.model.hibernate.UserAccount;
import mywatchlist.repository.TitleTypeRepo;
import mywatchlist.repository.UserAccountRepo;
import mywatchlist.repository.WatchlistEntryRepo;
import mywatchlist.repository.WatchlistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
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
        UserAccount userAccount = userAccountRepo.getById(id);
        UserAccountDto userAccountDto = new UserAccountDto();
        userAccountDto.setUsername(userAccount.getUsername());
        return userAccountDto;
    }

    public void registerUser(UserAccountDto userAccountDto) {
        UserAccount userAccount = new UserAccount();
        userAccount.setUsername(userAccountDto.getUsername());
        userAccount.setEmail(userAccountDto.getEmail());
        userAccount.setPrivateProfile(false);

        String hashedPw = BCrypt.hashpw(userAccountDto.getPassword(), BCrypt.gensalt());
        userAccount.setPassword(hashedPw);
        userAccountRepo.save(userAccount);
    }

    public boolean checkUserOrEmailExist(String email, String username) {
        boolean exist = false;
        List<UserAccount> userAccountList = userAccountRepo.findByEmailOrUsername(email, username);
        if (!userAccountList.isEmpty()) {
            exist = true;
        }
        return exist;
    }

    public boolean checkUsernameExist(String username) {
        return userAccountRepo.findByUsername(username).isPresent();
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


}
