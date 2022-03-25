package mywatchlist.model.hibernate;

import javax.persistence.*;

@Entity
@Table(name = "watchlist_entry")
public class WatchlistEntry {

    @Id
    @GeneratedValue
    @Column(name = "entry_id")
    private long entryId;
    @Column(name = "title_id", nullable = false)
    private int titleId;
    @ManyToOne
    @JoinColumn(name = "title_type_id", nullable = false)
    private TitleType titleType;
    @ManyToOne
    @JoinColumn(name = "watchlist_id", nullable = false)
    private Watchlist watchlistId;

    public long getEntryId() {
        return entryId;
    }

    public void setEntryId(long entryId) {
        this.entryId = entryId;
    }

    public int getTitleId() {
        return titleId;
    }

    public void setTitleId(int titleId) {
        this.titleId = titleId;
    }

    public Watchlist getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(Watchlist watchlistId) {
        this.watchlistId = watchlistId;
    }

    public TitleType getTitleType() {
        return titleType;
    }

    public void setTitleType(TitleType titleType) {
        this.titleType = titleType;
    }
}