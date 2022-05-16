package mywatchlist.model.dto;

import java.util.List;

public class DeleteSeasonsDto {

    private String username;
    private long watchlistId;
    private int titleId;
    private List<Short> seasons;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(long watchlistId) {
        this.watchlistId = watchlistId;
    }

    public int getTitleId() {
        return titleId;
    }

    public void setTitleId(int titleId) {
        this.titleId = titleId;
    }

    public List<Short> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<Short> seasons) {
        this.seasons = seasons;
    }
}
