package mywatchlist.repository;

import mywatchlist.model.hibernate.UserProfile;
import mywatchlist.model.hibernate.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WatchlistRepo extends JpaRepository<Watchlist, Long> {

    List<Watchlist> findAllByUserUserId(long userId);
    Optional<Watchlist> findByUserUserIdAndWatchlistName(long userId, String watchlistName);


}
