package mywatchlist.model.dto;

public class AddWatchlistEntryDto {
    private int titleId;
    private int titleType;
    private String username;

    public int getTitleId() {
        return titleId;
    }

    public void setTitleId(int titleId) {
        this.titleId = titleId;
    }

    public int getTitleType() {
        return titleType;
    }

    public void setTitleType(int titleType) {
        this.titleType = titleType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
