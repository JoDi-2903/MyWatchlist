import { Component } from "react";
import { useParams } from "react-router-dom";
import {
    getMovieImages,
    getMovieDetail,
    similarMovie,
    creditsMovie,
} from "../../api/API";
import { apiConfig } from "../../Config";
import { PlusIcon, FilmIcon, GlobeAltIcon } from "@heroicons/react/solid";
import Flicking from "@egjs/react-flicking";
import ListElement from "../../components/List/ListElement";
import ActorElement from "../../components/List/ActorElement";

function time_convert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
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
    let genresList = "";
    genresList = genresList + genres_arr[0];
    return genresList;
}

function age_rating(adult) {
    if (adult) {
        return "ADULTS ONLY • ";
    } else {
        return "";
    }
}

interface MovieDetailsProps {
    id: number;
}
interface MovieDetailsState {
    movieID: number;
    poster: string;
    backdrop: string;
    original_title: string;
    release_date: string;
    tagline: string;
    genres;
    runtime: number;
    adult: boolean;
    overview: string;
    status: string;
    original_language: string;
    budget: number;
    revenue: number;
    homepage: string;
    vote_average: number;
    similarMovie;
    creditsMovie;
}
export default class MovieDetails extends Component<
    MovieDetailsProps,
    MovieDetailsState
> {
    constructor(props) {
        super(props);
        this.state = {
            movieID: this.props.id,
            poster: "",
            backdrop: "",
            original_title: "",
            release_date: "",
            tagline: "",
            genres: [],
            runtime: 0,
            adult: false,
            overview: "",
            status: "",
            original_language: "en",
            budget: 0,
            revenue: 0,
            homepage: "",
            vote_average: 0,
            similarMovie: [],
            creditsMovie: [],
        };
    }
    async componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        if (this.state.movieID !== this.props.id) {
            this.setState({ movieID: this.props.id }, () => this.loadData());
        }
    }

    async loadData() {
        var movieDetails = await getMovieDetail(this.state.movieID);
        this.setState(
            {
                release_date: movieDetails.data.release_date,
                original_title: movieDetails.data.original_title,
                tagline: movieDetails.data.tagline,
                genres: movieDetails.data.genres,
                runtime: movieDetails.data.runtime,
                adult: movieDetails.data.adult,
                overview: movieDetails.data.overview,
                status: movieDetails.data.status,
                original_language: movieDetails.data.original_language,
                budget: movieDetails.data.budget,
                revenue: movieDetails.data.revenue,
                homepage: movieDetails.data.homepage,
                vote_average: movieDetails.data.vote_average,
            },
            async () => {
                var movieImages = await getMovieImages(this.state.movieID);
                var posters = movieImages.data.posters;
                var backdrops = movieImages.data.backdrops;
                this.setState(
                    {
                        poster: apiConfig.originalImage(posters[0].file_path),
                        backdrop: apiConfig.originalImage(
                            backdrops[0].file_path
                        ),
                    },
                    async () => {
                        var movieCast = await creditsMovie(this.state.movieID);
                        this.setState(
                            {
                                creditsMovie: movieCast.data.cast,
                            },
                            async () => {
                                var resultsMovie = await similarMovie(
                                    this.state.movieID
                                );
                                this.setState({
                                    similarMovie: resultsMovie.data.results,
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
                                    {genres_convert(this.state.genres)} •
                                    Rating:{" "}
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
                                Budget
                            </h3>
                            <p className="mt-0 text-white_text dark:text-dark_text text-md">
                                {this.state.budget.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    maximumFractionDigits: 0,
                                })}
                            </p>
                            <h3 className="mt-7 font-bold text-white_text dark:text-dark_text text-2xl">
                                Revenue
                            </h3>
                            <p className="mt-0 text-white_text dark:text-dark_text text-md">
                                {this.state.revenue.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    maximumFractionDigits: 0,
                                })}
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
                                    {this.state.creditsMovie.map((cast) => (
                                        <div key={cast.id}>
                                            <ActorElement
                                                id={cast.id}
                                                title={cast.original_name}
                                                vote_average={cast.vote_average}
                                                first_air_date={cast.character}
                                                type="movie"
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
                                Similar movies
                            </h1>
                            <Flicking
                                circular={false}
                                renderOnlyVisible={true}
                                align={"prev"}
                            >
                                {this.state.similarMovie.map((movie) => (
                                    <div key={movie.id}>
                                        <ListElement
                                            id={movie.id}
                                            type="movie"
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
