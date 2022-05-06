package mywatchlist.model.dto;

import java.util.List;

public class MyProfileDto {

    private String username;
    private String email;
    private boolean isPrivateProfile;
    private List<WatchlistDto> watchlistList;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
