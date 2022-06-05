package mywatchlist.repository;

import mywatchlist.model.hibernate.TvInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TvInfoRepo extends JpaRepository<TvInfo, Long> {

    List<TvInfo> findAllByWatchlistEntryEntryIdOrderBySeasonAscEpisode(long entryId);

    List<TvInfo> findByWatchlistEntryEntryIdAndSeason(long entryId, short season);

    List<TvInfo> findByWatchlistEntryEntryId(long entryId);
}
