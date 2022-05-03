package mywatchlist.model.dto;

import mywatchlist.model.hibernate.TitleType;

import java.util.List;

//todo löschen weil neues dto objekt
public class WatchlistEntryDto {

    private int titleId;
    private short titleType;
    private List<TvInfoDto> tvInfoDtoList;


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

    public List<TvInfoDto> getTvInfoDtoList() {
        return tvInfoDtoList;
    }

    public void setTvInfoDtoList(List<TvInfoDto> tvInfoDtoList) {
        this.tvInfoDtoList = tvInfoDtoList;
    }
}
