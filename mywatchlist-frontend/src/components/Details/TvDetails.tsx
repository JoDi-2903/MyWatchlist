import { Component } from "react";
import { getTVImages, getTVDetail, similarTV, creditsTV } from "../../api/API";
import { apiConfig } from "../../Config";
import { PlusIcon, FilmIcon, GlobeAltIcon } from "@heroicons/react/solid";
import Flicking from "@egjs/react-flicking";
import ListElement from "../../components/List/ListElement";
import ActorElement from "../../components/List/ActorElement";

function time_convert(num) {
    // Bug: only time of one single episode
    var totalTimeInMinutes = 0;
    for (let i = 0; i < num.length; i++) {
        totalTimeInMinutes = totalTimeInMinutes + parseInt(num[i]);
    }
    var hours = Math.floor(totalTimeInMinutes / 60);
    var minutes = totalTimeInMinutes % 60;
    return hours + "h " + minutes + "m";
}

function language_convert(languageCode) {
    let languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    return languageNames.of(languageCode);
}

function stars_convert(vote_average) {
    let stars = "☆☆☆☆☆";
    let votingInStars = Math.floor(5 * vote_average * 0.1);
    switch (votingInStars) {
        case 1:
            stars = "★☆☆☆☆";
            break;
        case 2:
            stars = "★★☆☆☆";
            break;
        case 3:
            stars = "★★★☆☆";
            break;
        case 4:
            stars = "★★★★☆";
            break;
        case 5:
            stars = "★★★★★";
            break;
        default:
            stars = "☆☆☆☆☆";
            break;
    }
    return stars;
}

function genres_convert(genres_arr) {
    // Fix displaying of genres from array
    let genresList = "Genres [Error]";
    for (let i = 0; i < genres_arr.length; i++) {
        genresList.concat(genres_arr[i].toString());
    }
    return genresList;
}

function age_rating(adult) {
    if (adult) {
        return "ADULTS ONLY • ";
    } else {
        return "";
    }
}

interface TVDetailsProps {
    id: number;
}
interface TVDetailsState {
    tvID: number;
    poster: string;
    backdrop: string;
    original_title: string;
    release_date: string;
    tagline: string;
    genres;
    runtime;
    adult: boolean;
    overview: string;
    status: string;
    original_language: string;
    number_of_episodes: number;
    number_of_seasons: number;
    homepage: string;
    vote_average: number;
    type: string;
    similarTV;
    creditsTV;
}
export default class tvDetails extends Component<
    TVDetailsProps,
    TVDetailsState
> {
    constructor(props) {
        super(props);
        this.state = {
            tvID: this.props.id,
            poster: "",
            backdrop: "",
            original_title: "",
            release_date: "",
            tagline: "",
            genres: [],
            runtime: [],
            adult: false,
            overview: "",
            status: "",
            original_language: "en",
            number_of_episodes: 0,
            number_of_seasons: 0,
            homepage: "",
            vote_average: 0,
            type: "",
            similarTV: [],
            creditsTV: [],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        if (this.state.tvID !== this.props.id) {
            this.setState({ tvID: this.props.id }, () => this.loadData());
        }
    }

    async loadData() {
        var tvDetails = await getTVDetail(this.state.tvID);
        this.setState(
            {
                release_date: tvDetails.data.first_air_date,
                original_title: tvDetails.data.original_name,
                tagline: tvDetails.data.tagline,
                genres: tvDetails.data.genres,
                runtime: tvDetails.data.episode_run_time,
                adult: tvDetails.data.adult,
                overview: tvDetails.data.overview,
                status: tvDetails.data.status,
                original_language: tvDetails.data.original_language,
                number_of_episodes: tvDetails.data.number_of_episodes,
                number_of_seasons: tvDetails.data.number_of_seasons,
                homepage: tvDetails.data.homepage,
                vote_average: tvDetails.data.vote_average,
            },
            async () => {
                var tvImages = await getTVImages(this.state.tvID);
                var posters = tvImages.data.posters;
                var backdrops = tvImages.data.backdrops;
                this.setState(
                    {
                        poster: apiConfig.originalImage(posters[0].file_path),
                        backdrop: apiConfig.originalImage(
                            backdrops[0].file_path
                        ),
                    },
                    async () => {
                        var tvCast = await creditsTV(this.state.tvID);
                        this.setState(
                            {
                                creditsTV: tvCast.data.cast,
                            },
                            async () => {
                                var resultsTV = await similarTV(
                                    this.state.tvID
                                );
                                this.setState({
                                    similarTV: resultsTV.data.results,
                                });
                            }
                        );
                    }
                );
            }
        );
    }

    render() {
        return (
            <div>
                <div className="bg-gradient-to-tl from-black via-dark_bg to-dark_bg h-96 w-full bg-cover bg-center relative">
                    <img
                        src={this.state.backdrop}
                        className="w-full h-full object-cover absolute mix-blend-overlay"
                    />
                    <div className="grid-background absolute inset-0 p-2 grid grid-cols-12 gap-0">
                        <div className="col-span-1"></div>
                        <div className="col-span-2">
                            <img
                                src={this.state.poster}
                                className="h-auto w-auto object-cover rounded-lg border-2 border-white shadow-2xl shadow-black"
                            />
                        </div>
                        <div className="col-span-9">
                            <div className="p-24 absolute">
                                <h1 className="text-white text-6xl font-bold">
                                    {this.state.original_title}
                                    <span className="text-primary italic font-medium">
                                        {" "}
                                        (
                                        {this.state.release_date.substring(
                                            0,
                                            4
                                        )}
                                        )
                                    </span>
                                </h1>
                                <h2 className="text-white text-4xl font-light mt-5 italic ">
                                    {this.state.tagline}
                                </h2>
                                <h4 className="text-white text-xl font-ligth mt-20">
                                    {" "}
                                    {age_rating(this.state.adult)}
                                    {genres_convert(this.state.genres)} •{" "}
                                    {this.state.type} • Rating:{" "}
                                    {stars_convert(this.state.vote_average)} •
                                    Runtime: {time_convert(this.state.runtime)}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-background absolute inset-0 p-2 mt-[490px] grid grid-cols-12 gap-0">
                    <div className="col-span-3 row-span-1">
                        <div className="ml-8 mr-8 mt-24">
                            <h3 className="mt-10 font-bold text-white_text dark:text-dark_text text-2xl">
                                Status
                            </h3>
                            <p className="mt-0 text-white_text dark:text-dark_text text-md">
                                {this.state.status}
                            </p>
                            <h3 className="mt-10 font-bold text-white_text dark:text-dark_text text-2xl">
                                Release date
                            </h3>
                            <p className="mt-0 text-white_text dark:text-dark_text text-md">
                                {this.state.release_date}
                            </p>
                            <h3 className="mt-7 font-bold text-white_text dark:text-dark_text text-2xl">
                                Original Language
                            </h3>
                            <p className="mt-0 text-white_text dark:text-dark_text text-md">
                                {language_convert(this.state.original_language)}
                            </p>
                            <h3 className="mt-7 font-bold text-white_text dark:text-dark_text text-2xl">
                                Episodes
                            </h3>
                            <p className="mt-0 text-white_text dark:text-dark_text text-md">
                                {this.state.number_of_episodes}
                            </p>
                            <h3 className="mt-7 font-bold text-white_text dark:text-dark_text text-2xl">
                                Seasons
                            </h3>
                            <p className="mt-0 text-white_text dark:text-dark_text text-md">
                                {this.state.number_of_seasons}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-9 row-span-1">
                        <div className="ml-11 mt-2">
                            <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 border-2 border-primary text-white_text dark:text-white font-bold py-2 px-4 rounded-lg inline-flex items-center">
                                <PlusIcon className="w-6 h-6 mr-2 text-white_text dark:text-white" />
                                <span>Add to Watchlist</span>
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 border-2 border-primary text-white_text dark:text-white font-bold py-2 px-4 rounded-lg inline-flex items-center ml-6">
                                <FilmIcon className="w-6 h-6 mr-2 text-white_text dark:text-white" />
                                <span>Watch trailer</span>
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 border-2 border-primary text-white_text dark:text-white font-bold py-2 px-4 rounded-lg inline-flex items-center ml-6">
                                <GlobeAltIcon className="w-6 h-6 mr-2 text-white_text dark:text-white" />
                                <span>Visit Homepage</span>
                            </button>
                            <h3 className="mt-10 font-bold text-white_text dark:text-dark_text text-2xl">
                                Overview
                            </h3>
                            <p className="mt-3 text-white_text dark:text-dark_text text-md">
                                {this.state.overview}
                            </p>
                            <div className="mt-8">
                                <h1 className="mb-2 font-bold text-white_text dark:text-dark_text text-2xl">
                                    Top Billed Cast
                                </h1>
                                <Flicking
                                    circular={false}
                                    renderOnlyVisible={true}
                                    align={"prev"}
                                >
                                    {this.state.creditsTV.map((cast) => (
                                        <div key={cast.id}>
                                            <ActorElement
                                                id={cast.id}
                                                title={cast.original_name}
                                                vote_average={cast.vote_average}
                                                first_air_date={cast.character}
                                                type="tv"
                                                key={cast.id}
                                            />
                                        </div>
                                    ))}
                                </Flicking>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 row-span-1 dark:bg-gray-500 bg-gray-200">
                        <div className="mt-4 ml-3 mr-3">
                            <h1 className="ml-5 mb-2 font-bold text-white_text dark:text-dark_text text-2xl">
                                Similar TV shows
                            </h1>
                            <Flicking
                                circular={false}
                                renderOnlyVisible={true}
                                align={"prev"}
                            >
                                {this.state.similarTV.map((movie) => (
                                    <div key={movie.id}>
                                        <ListElement
                                            id={movie.id}
                                            type="tv"
                                            key={movie.id}
                                            showAddToList={true}
                                            showDeleteFromList={false}
                                        />
                                    </div>
                                ))}
                            </Flicking>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
