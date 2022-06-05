package mywatchlist.security;

import mywatchlist.model.hibernate.UserProfile;
import mywatchlist.repository.UserAccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailService implements UserDetailsService {
    private final UserAccountRepo userAccountRepo;

    public CustomUserDetailService(UserAccountRepo userAccountRepo) {
        this.userAccountRepo = userAccountRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserProfile userAccount = userAccountRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not present"));

        return new User(userAccount.getUsername(), userAccount.getPassword(), Collections.emptyList());
    }
}
