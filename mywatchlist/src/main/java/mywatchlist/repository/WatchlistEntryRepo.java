package mywatchlist.repository;

import mywatchlist.model.hibernate.Watchlist;
import mywatchlist.model.hibernate.WatchlistEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WatchlistEntryRepo extends JpaRepository<WatchlistEntry, Long> {
    List<WatchlistEntry> findAllByWatchlistWatchlistId(long watchlistId);//todo fehler?

    @Query("SELECT we FROM WatchlistEntry we INNER JOIN Watchlist w on w.watchlistId = we.watchlist.watchlistId " +
            "INNER JOIN UserProfile up on w.user.userId = up.userId " +
            "where we.titleId =:titleId " +
            "and up.username =:username and w.watchlistId =:watchlistId"
    )
    Optional<WatchlistEntry> findWatchlistEntryByTitleIdAndUsernameAndWatchlistWatchlistId(@Param(value = "titleId") int titleId,
                                                                                            @Param(value = "username") String username,
                                                                                            @Param(value = "watchlistId") long watchlistId);
    Optional<WatchlistEntry> findByTitleIdAndWatchlistWatchlistId(int titleId, long watchlistId);

}
