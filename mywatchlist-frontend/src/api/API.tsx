import { apiConfig } from "../Config";

export const request = async (url: string, method: string, params: string) => {
    var responseStatus: number = 0;
    var responseData;
    await fetch(
        apiConfig.baseUrl + url + "?api_key=" + apiConfig.apiKey + params,
        {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
        .then((response) => {
            responseStatus = response.status;
            return response.json();
        })
        .then((data) => (responseData = data));
    return { status: responseStatus, data: responseData };
};

export const getMovieDetail = async (movie_id: number) => {
    return await request("movie/" + movie_id, "GET", "");
};
export const getMovieImages = async (movie_id: number) => {
    return await request("movie/" + movie_id + "/images", "GET", "");
};
export const getTVDetail = async (tv_id: number) => {
    return await request("tv/" + tv_id, "GET", "");
};
export const getTVImages = async (movie_id: number) => {
    return await request("tv/" + movie_id + "/images", "GET", "");
};
export const searchMovie = async (query: string) => {
    return await request("search/movie", "GET", query + "&include_adult=false");
};
export const searchTV = async (query: string) => {
    return await request("search/tv", "GET", query + "&include_adult=false");
};

export const discoverMovie = async () => {
    return await request("discover/movie", "GET", "");
};
export const discoverTV = async () => {
    return await request("discover/tv", "GET", "");
};

export const getFullTVList = async (tv_id: number) => {
    var details = await getTVDetail(tv_id);
    var data = new Array();
    details.data.seasons.forEach((season) => {
        var season_object = {
            season: season.season_number,
            episodes: Array.from(
                { length: season.episode_count },
                (_, i) => i + 1
            ),
        };
        data.push(season_object);
    });
    return data;
};
