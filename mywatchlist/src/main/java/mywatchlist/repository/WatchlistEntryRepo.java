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

    Optional<WatchlistEntry> findByTitleIdAndWatchlistWatchlistId(int titleId, long watchlistId);

}
