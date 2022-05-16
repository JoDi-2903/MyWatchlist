import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { apiConfig, backendURL } from "../Config";
import { JWTInfo } from "../security/JWTContext";

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
export const similarMovie = async (movie_id: number) => {
    return await request("movie/" + movie_id + "/similar", "GET", "");
};
export const similarTV = async (tv_id: number) => {
    return await request("tv/" + tv_id + "/similar", "GET", "");
};
export const creditsMovie = async (movie_id: number) => {
    return await request("movie/" + movie_id + "/credits", "GET", "");
};
export const creditsTV = async (tv_id: number) => {
    return await request("tv/" + tv_id + "/credits", "GET", "");
};
export const getPersonImages = async (person_id: number) => {
    return await request("person/" + person_id + "/images", "GET", "");
};

export const getFullTVList = async (tv_id: number) => {
    var details = await getTVDetail(tv_id);
    var data: any[] = [];
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

export const addElementToList = async (
    jwtInfo: JWTInfo,
    id: number,
    type: string,
    tvInfoList
) => {
    var responseStatus: number = 0;
    var responseData;
    await fetch(backendURL + "/watchlist/getwatchlists/" + jwtInfo.username, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + jwtInfo.jwt,
        },
    })
        .then((response) => {
            responseStatus = response.status;
            return response.json();
        })
        .then((data) => {
            responseData = data;
        });
    if (responseStatus === 200) {
        var optionsList = responseData.map((list) => list.watchlistName);
        Swal.fire({
            icon: "question",
            title: "To which list the " + type + " should be added?",
            showCancelButton: true,
            reverseButtons: true,
            input: "select",
            inputOptions: optionsList,
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = {
                    username: jwtInfo.username,
                    watchlistId: responseData[result.value].watchlistId,
                    watchlistEntry: {
                        titleId: id,
                        titleType: type,
                        tvInfoList: tvInfoList,
                    },
                };
                var addStatus: number = 0;
                var addStatusText: string = "";
                await fetch(backendURL + "/watchlist/addWatchlistlistEntry", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + jwtInfo.jwt,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                })
                    .then((response) => {
                        addStatus = response.status;
                        return response.json();
                    })
                    .then((data) => (addStatusText = data.response));
                if (addStatus === 201) {
                    toast.success(addStatusText);
                } else {
                    toast.error(addStatusText);
                }
            }
        });
    } else {
        toast.error("Could not fetch data.");
    }
};

export const deleteFromList = async (
    jwtInfo: JWTInfo,
    watchlistId: number,
    titleId: number
) => {
    var responseStatus: number = 0;
    var responseData;
    await fetch(backendURL + "/watchlist/deleteCompleteTvOrMovie", {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + jwtInfo.jwt,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: jwtInfo.username,
            watchlistId: watchlistId,
            titleId: titleId,
        }),
    })
        .then((response) => {
            responseStatus = response.status;
            return response.json();
        })
        .then((data) => {
            responseData = data;
        });
    if (responseStatus === 200) {
        toast.success(responseData.response);
    } else {
        toast.error(responseData.response);
    }
};
