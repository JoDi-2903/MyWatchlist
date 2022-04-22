package mywatchlist.model.dto;

import mywatchlist.model.hibernate.WatchlistEntry;

import java.util.ArrayList;
import java.util.List;

public class WatchlistDto {

    private String watchlistName;
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

    public List<WatchlistEntryDto> getWatchlistEntries() {
        return watchlistEntries;
    }
}
