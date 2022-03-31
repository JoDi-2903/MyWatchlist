package mywatchlist.repository;

import mywatchlist.model.hibernate.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAccountRepo extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByUsername(String username);
    //Optional<UserAccount> findById(long userId);

    //geht nicht wie umsetzen?

   List<UserAccount> findByEmailOrUsername(String eMail, String username);



}
