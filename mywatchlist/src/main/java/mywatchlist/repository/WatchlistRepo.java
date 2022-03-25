package mywatchlist.repository;

import mywatchlist.model.hibernate.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchlistRepo extends JpaRepository<Watchlist, Long> {
}
