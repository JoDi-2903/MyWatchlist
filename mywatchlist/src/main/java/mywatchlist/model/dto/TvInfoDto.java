package mywatchlist.model.dto;

import java.util.List;

public class TvInfoDto {
        private short season;
        private List<Short> episodes;

        public short getSeason() {
            return season;
        }

        public void setSeason(short season) {
            this.season = season;
        }

        public List<Short> getEpisodes() {
            return episodes;
        }

        public void setEpisodes(List<Short> episodes) {
            this.episodes = episodes;
        }
}
