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
}
export const discoverTV = async () => {
    return await request("discover/tv", "GET", "");
}
export const similarMovie = async (movie_id: number) => {
    return await request("movie/" + movie_id + "/similar", "GET", "");
}
export const similarTV = async (tv_id: number) => {
    return await request("tv/" + tv_id + "/similar", "GET", "");
}
export const creditsMovie = async (movie_id: number) => {
    return await request("movie/" + movie_id + "/credits", "GET", "");
}
export const creditsTV = async (tv_id: number) => {
    return await request("tv/" + tv_id + "/credits", "GET", "");
}
export const getPersonImages = async (person_id: number) => {
    return await request("person/" + person_id + "/images", "GET", "");
}