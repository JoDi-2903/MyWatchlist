package mywatchlist.model.hibernate;

import javax.persistence.*;

@Entity
@Table(name = "watchlist_entry")
public class WatchlistEntry {

    @Id
    @GeneratedValue
    @Column(name = "entry_id")
    private int entryId;
    @Column(name = "type", nullable = false)
    private int type;
    @Column(name = "title_id", nullable = false)
    private int titleId;
    @ManyToOne
    @JoinColumn(name = "watchlist_id", nullable = false)
    private Watchlist watchlistId;

    public int getEntryId() {
        return entryId;
    }

    public void setEntryId(int entryId) {
        this.entryId = entryId;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
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
}