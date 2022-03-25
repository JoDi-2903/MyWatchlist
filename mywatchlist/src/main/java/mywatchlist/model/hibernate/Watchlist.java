package mywatchlist.model.hibernate;


import javax.persistence.*;

@Entity
public class Watchlist {

    @Id
    @GeneratedValue
    @Column(name = "watchlist_id")
    private int watchlistId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserAccount user;

    public int getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(int watchlistId) {
        this.watchlistId = watchlistId;
    }

    public UserAccount getUser() {
        return user;
    }

    public void setUser(UserAccount user) {
        this.user = user;
    }
}
