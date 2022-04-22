package mywatchlist.repository;

import mywatchlist.model.hibernate.Watchlist;
import mywatchlist.model.hibernate.WatchlistEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistEntryRepo extends JpaRepository<WatchlistEntry, Long> {
    List<WatchlistEntry> findAllByWatchlistWatchlistId(long userId);
}
