package mywatchlist.security;

import mywatchlist.model.hibernate.UserAccount;
import mywatchlist.repository.UserAccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
@Configuration
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserAccountRepo userAccountRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount userAccount = userAccountRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not present"));

        return new User(userAccount.getUsername(), userAccount.getPassword(), Collections.emptyList());
    }
}
