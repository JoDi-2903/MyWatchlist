package mywatchlist.service;

import mywatchlist.model.dto.UserAccountDto;
import mywatchlist.model.hibernate.UserAccount;
import mywatchlist.repository.TitleTypeRepo;
import mywatchlist.repository.UserAccountRepo;
import mywatchlist.repository.WatchlistEntryRepo;
import mywatchlist.repository.WatchlistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyWatchlistService implements UserDetailsService {

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
        userAccount.setPassword(userAccountDto.getPassword());
        //passwort hashen und prüfen
        //Prüfen besser machen. Evtl. Framework dazu nehmen?
        //Wie fehler nach oben geben?
        if(validateUsername(userAccount.getEmail())){

                List<UserAccount> uc = userAccountRepo.findByEmailOrUsername(userAccount.getEmail(), userAccount.getUsername());
                if(uc.size() == 0){
                    userAccountRepo.save(userAccount);
                }

        }
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount userAccount = userAccountRepo.findByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException("User not found in the database" + username));
        return new User(userAccount.getUsername(), userAccount.getPassword(), null);
    }

    public boolean checkUsernameExist(String username) {
        return userAccountRepo.findByUsername(username).isPresent();
    }

    public boolean validateUsername(String username){
        String pattern = "^[A-Za-z0-9]{3,20}$";
        return username.matches(pattern);
    }

    public boolean validateEmail(){
        return false;
    }

    public boolean validatePassword(){
        return false;
    }



}
