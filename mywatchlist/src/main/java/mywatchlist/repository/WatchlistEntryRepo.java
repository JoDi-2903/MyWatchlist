package mywatchlist.repository;

import mywatchlist.model.hibernate.WatchlistEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchlistEntryRepo extends JpaRepository<WatchlistEntry, Long> {
}
