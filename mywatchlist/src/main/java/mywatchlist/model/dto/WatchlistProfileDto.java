package mywatchlist.model.dto;

import java.util.ArrayList;
import java.util.List;

public class WatchlistProfileDto {
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

    public void setWatchlistEntries(List<WatchlistEntryDto> watchlistEntries) {
        this.watchlistEntries = watchlistEntries;
    }
}
