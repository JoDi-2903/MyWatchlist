package mywatchlist.model.dto;

import java.util.List;

//todo löschen weil neues dto objekt
public class WatchlistEntryDto {

    private int titleId;
    private short titleType;
    private List<TvInfoDto> tvInfoList;

    public int getTitleId() {
        return titleId;
    }

    public void setTitleId(int titleId) {
        this.titleId = titleId;
    }

    public short getTitleType() {
        return titleType;
    }

    public void setTitleType(short titleType) {
        this.titleType = titleType;
    }

    public List<TvInfoDto> getTvInfoList() {
        return tvInfoList;
    }

    public void setTvInfoList(List<TvInfoDto> tvInfoList) {
        this.tvInfoList = tvInfoList;
    }
}
