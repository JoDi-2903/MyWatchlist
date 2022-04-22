package mywatchlist.model.dto;

import mywatchlist.model.hibernate.TitleType;

public class WatchlistEntryDto {

    private int titleId;
    private int titleType;

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
}
