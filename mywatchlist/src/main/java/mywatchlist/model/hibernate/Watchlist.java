package mywatchlist.model.hibernate;


import javax.persistence.*;

@Entity
public class Watchlist {

    @Id
    @GeneratedValue
    @Column(name = "watchlist_id")
    private Long watchlistId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserAccount user;

    public Long getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(Long watchlistId) {
        this.watchlistId = watchlistId;
    }

    public UserAccount getUser() {
        return user;
    }

    public void setUser(UserAccount user) {
        this.user = user;
    }
}
