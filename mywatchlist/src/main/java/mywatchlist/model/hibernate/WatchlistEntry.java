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
    private Watchlist watchlist;

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

    public Watchlist getWatchlist() {
        return watchlist;
    }

    public void setWatchlist(Watchlist watchlistId) {
        this.watchlist = watchlistId;
    }

    public TitleType getTitleType() {
        return titleType;
    }

    public void setTitleType(TitleType titleType) {
        this.titleType = titleType;
    }
}