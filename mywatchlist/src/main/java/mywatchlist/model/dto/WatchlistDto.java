package mywatchlist.model.dto;

import mywatchlist.model.hibernate.WatchlistEntry;

import java.util.ArrayList;
import java.util.List;

public class WatchlistDto {

    private String watchlistName;
    private long watchlistId;
    private List<WatchlistEntryDto> watchlistEntries = new ArrayList<>();

    public void AddEntry(WatchlistEntryDto watchlistEntry){
        watchlistEntries.add(watchlistEntry);
    }

    public String getWatchlistName() {
        return watchlistName;
    }

    public void setWatchlistName(String watchlistName) {
        this.watchlistName = watchlistName;
    }

    public long getWatchlistId() {
        return watchlistId;
    }

    public void setWatchlistId(long watchlistId) {
        this.watchlistId = watchlistId;
    }

    public List<WatchlistEntryDto> getWatchlistEntries() {
        return watchlistEntries;
    }
}
