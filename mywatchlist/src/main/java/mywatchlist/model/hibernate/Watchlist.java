package mywatchlist.model.hibernate;


import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class Watchlist {

    @Id
    @GeneratedValue
    @Column(name = "watchlist_id")
    private long watchlistId;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id")
    private UserProfile user;
    @Column(name = "watchlist_name", nullable = false)
    private String watchlistName;

    public long getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(long watchlistId) {
        this.watchlistId = watchlistId;
    }

    public UserProfile getUser() {
        return user;
    }

    public void setUser(UserProfile user) {
        this.user = user;
    }

    public String getWatchlistName() {
        return watchlistName;
    }

    public void setWatchlistName(String watchlistName) {
        this.watchlistName = watchlistName;
    }
}
