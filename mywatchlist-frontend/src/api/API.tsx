import { apiConfig } from "../Config";

export const request = async (url: string, method: string) => {
    var responseStatus: number = 0;
    var responseData;
    await fetch(
        apiConfig.baseUrl +
            url +
            '?api_key=' + apiConfig.apiKey,
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

export const getMovieDetail = async (movie_id: string) => {
    return await request("/movie/" + movie_id, "GET");
};
export const getMovieImages = async (movie_id) => {
    return await request("/movie/" + movie_id + "/images", "GET");
};
export const getTVDetail = async (tv_id: string) => {
    return await request("/tv/" + tv_id, "GET");
};
export const getTVImages = async (movie_id) => {
    return await request("/tv/" + movie_id + "/images", "GET");
};
