package mywatchlist.repository;

import mywatchlist.model.hibernate.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAccountRepo extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUsername(String username);
    //Optional<UserAccount> findById(long userId);
    //UserAccount findByUsername(String username);
    //geht nicht wie umsetzen?

   List<UserProfile> findByEmailOrUsername(String eMail, String username);




}
