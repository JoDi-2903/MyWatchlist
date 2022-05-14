import { Component } from "react";
import { useParams } from "react-router-dom";
import { getMovieImages, getMovieDetail } from "../../api/API";
import { apiConfig } from "../../Config";
import { PlusIcon, FilmIcon } from "@heroicons/react/solid";

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
    genres: string[];
    runtime: number;
    adult: boolean;
    overview: string;
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
        };
    }
    async componentDidMount() {
        var movieDetails = await getMovieDetail(this.state.movieID);
        var movieImages = await getMovieImages(this.state.movieID);
        var posters = movieImages.data.posters;
        var backdrops = movieImages.data.backdrops;
        this.setState({
            poster: apiConfig.originalImage(posters[0].file_path),
            backdrop: apiConfig.originalImage(backdrops[0].file_path),
            release_date: movieDetails.data.release_date,
            original_title: movieDetails.data.original_title,
            tagline: movieDetails.data.tagline,
            genres: movieDetails.data.genres,
            runtime: movieDetails.data.runtime,
            adult: movieDetails.data.adult,
            overview: movieDetails.data.overview,
        });
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
                                    Adult: {this.state.adult} • Genres • Rating:
                                    ★★★★☆ • Runtime: {this.state.runtime} min
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-background absolute inset-0 p-2 mt-[490px] grid grid-cols-12 gap-0">
                    <div className="col-span-3 row-span-1 bg-red-600"></div>
                    <div className="col-span-9 row-span-1">
                        <div className="ml-11 mt-2">
                            <button className="bg-gray-500 hover:bg-gray-600 border-2 border-primary text-white font-bold py-2 px-4 rounded-lg inline-flex items-center">
                                <PlusIcon className="w-6 h-6 mr-2 text-white" />
                                <span>Add to Watchlist</span>
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-600 border-2 border-primary text-white font-bold py-2 px-4 rounded-lg inline-flex items-center ml-6">
                                <FilmIcon className="w-6 h-6 mr-2 text-white" />
                                <span>Watch trailer</span>
                            </button>
                            <h3 className="mt-10 font-bold text-white_text dark:text-dark_text text-2xl">Overview</h3>
                            <p className="mt-3 text-white_text dark:text-dark_text text-md">{this.state.overview}</p>
                        </div>
                    </div>
                    <div className="col-span-12 row-span-1 bg-yellow-600"></div>
                </div>
            </div>
        );
    }
}
