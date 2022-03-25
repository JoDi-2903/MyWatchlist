package mywatchlist.model.hibernate;


import javax.persistence.*;

@Entity
public class Watchlist {

    @Id
    @GeneratedValue
    @Column(name = "watchlist_id")
    private long watchlistId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserAccount user;

    public long getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(long watchlistId) {
        this.watchlistId = watchlistId;
    }

    public UserAccount getUser() {
        return user;
    }

    public void setUser(UserAccount user) {
        this.user = user;
    }
}
