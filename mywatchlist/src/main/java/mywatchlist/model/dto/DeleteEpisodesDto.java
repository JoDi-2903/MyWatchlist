package mywatchlist.model.dto;

import mywatchlist.model.hibernate.TvInfo;

public class DeleteEpisodesDto {

    private String username;
    private long watchlistId;
    private int titleId;

    private TvInfoDto tvInfo;

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

    public TvInfoDto getTvInfo() {
        return tvInfo;
    }

    public void setTvInfo(TvInfoDto tvInfo) {
        this.tvInfo = tvInfo;
    }
}
