package mywatchlist.model.dto;

import java.util.List;

public class WatchlistEntryAndTvInfoDto {
    private int titleId;
    private int titleType;
    private List<TvInfoDto> tvInfoDtoList;

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

    public List<TvInfoDto> getTvInfoDtoList() {
        return tvInfoDtoList;
    }

    public void setTvInfoDtoList(List<TvInfoDto> tvInfoDtoList) {
        this.tvInfoDtoList = tvInfoDtoList;
    }
}
