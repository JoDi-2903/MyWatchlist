package mywatchlist.model.dto;

public class AddWatchlistEntryDto {

    private String username;
    private long watchlistId;
    private WatchlistEntryDto watchlistEntry;

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


    public WatchlistEntryDto getWatchlistEntry() {
        return watchlistEntry;
    }

    public void setWatchlistEntry(WatchlistEntryDto watchlistEntry) {
        this.watchlistEntry = watchlistEntry;
    }
}
