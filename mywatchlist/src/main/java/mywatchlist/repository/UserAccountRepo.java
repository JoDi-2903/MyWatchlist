package mywatchlist.repository;

import mywatchlist.model.hibernate.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAccountRepo extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUsername(String username);

    List<UserProfile> findByEmailOrUsername(String eMail, String username);

    Optional<UserProfile> findByEmail(String eMail);

    @Modifying
    @Transactional
    @Query("update UserProfile u set u.email =:email where u.userId =:userId")
    void updateEmail(@Param(value = "email") String email, @Param(value = "userId") long userId);

    @Modifying
    @Transactional
    @Query("update UserProfile u set u.password =:password where u.userId =:userId")
    void updatePassword(@Param(value = "password") String password, @Param(value = "userId") long userId);

    @Modifying
    @Transactional
    @Query("update UserProfile u set u.privateProfile =:privateProfile where u.userId =:userId")
    void updatePrivateProfile(@Param(value = "privateProfile") boolean privateProfile, @Param(value = "userId") long userId);
}
