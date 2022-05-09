package mywatchlist.model.dto;

import java.util.List;

//todo löschen weil neues dto objekt
public class WatchlistEntryDto {

    private int titleId;
    private String titleType;
    private List<TvInfoDto> tvInfoList;

    public List<TvInfoDto> getTvInfoList() {
        return tvInfoList;
    }

    public void setTvInfoList(List<TvInfoDto> tvInfoList) {
        this.tvInfoList = tvInfoList;
    }

    public int getTitleId() {
        return titleId;
    }

    public void setTitleId(int titleId) {
        this.titleId = titleId;
    }

    public String getTitleType() {
        return titleType;
    }

    public void setTitleType(String titleType) {
        this.titleType = titleType;
    }
}
