package mywatchlist.model.hibernate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "tv_info")
public class TvInfo {

    @Id
    @GeneratedValue
    @Column(name = "tv_info_id")
    private long tvInfoId;
    @Column(name = "season", nullable = false)
    private short season;
    @Column(name = "episode", nullable = false)
    private short episode;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "entry_id", nullable = false)
    private WatchlistEntry watchlistEntry;

    public long getTvInfoId() {
        return tvInfoId;
    }

    public void setTvInfoId(long tvInfoId) {
        this.tvInfoId = tvInfoId;
    }

    public short getSeason() {
        return season;
    }

    public void setSeason(short season) {
        this.season = season;
    }

    public short getEpisode() {
        return episode;
    }

    public void setEpisode(short episode) {
        this.episode = episode;
    }

    public WatchlistEntry getWatchlistEntry() {
        return watchlistEntry;
    }

    public void setWatchlistEntry(WatchlistEntry watchlistEntry) {
        this.watchlistEntry = watchlistEntry;
    }
}
