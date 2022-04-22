package mywatchlist.model.dto;

import java.util.List;

public class ProfileDto {
    private String username;
    private boolean isPrivateProfile;
    private List<WatchlistDto> watchlistList;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isPrivateProfile() {
        return isPrivateProfile;
    }

    public void setPrivateProfile(boolean privateProfile) {
        isPrivateProfile = privateProfile;
    }

    public List<WatchlistDto> getWatchlistList() {
        return watchlistList;
    }

    public void setWatchlistList(List<WatchlistDto> watchlistList) {
        this.watchlistList = watchlistList;
    }
}
