package mywatchlist.repository;

import mywatchlist.model.hibernate.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepo extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByUsername(String username);

}
