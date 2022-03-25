package model.hibernate;

import javax.persistence.*;

@Entity
public class Watchlist {

    @Id
    @GeneratedValue
    @Column(name = "watchlist_id")
    private int watchlistId;
    @Column(name = "user_Id")
    private int userId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(int watchlistId) {
        this.watchlistId = watchlistId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
