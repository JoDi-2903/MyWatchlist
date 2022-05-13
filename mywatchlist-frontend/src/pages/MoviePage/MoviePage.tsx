import { Component } from "react";
import { useParams } from "react-router-dom";
import { getMovieImages, getMovieDetail } from "../../api/API";
import { apiConfig } from "../../Config";

export default class MoviePage extends Component<{}, { movieID: number, poster: string, backdrop: string, original_title: string, release_date: string, tagline: string, genres: string[], runtime: number, adult: boolean}> {

    constructor(props) {
        super(props);
        this.state = {
            movieID: 0,
            poster: "",
            backdrop: "",
            original_title: "",
            release_date: "",
            tagline: "",
            genres: [],
            runtime: 0,
            adult: false,
        };
    }
    async componentDidMount() {
        //const params = useParams();
        //var movieID = parseInt(params.id as string);
        var movieID = 675353;

        var movieDetails = await getMovieDetail(movieID);
        var movieImages = await getMovieImages(movieID);
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
        });
    }
    render() {
        return (
            <div>
                <div className="bg-gradient-to-tl from-black via-dark_bg to-dark_bg h-96 w-full bg-cover bg-center relative">
                    <img src={this.state.backdrop} className="w-full h-full object-cover absolute mix-blend-overlay" />
                    <div className="grid-background absolute inset-0 p-2 grid grid-cols-12 gap-0">
                        <div className="col-span-1"></div>
                        <div className="col-span-2">
                            <img src={this.state.poster} className="h-auto w-auto object-cover rounded-lg border-2 border-white shadow-2xl shadow-black" />
                        </div>
                        <div className="col-span-9">
                            <div className="p-24 absolute">
                                <h1 className="text-white text-6xl font-bold">{this.state.original_title}
                                    <span className="text-primary italic font-medium"> ({this.state.release_date.substring(0,4)})</span>
                                </h1>
                                <h2 className="text-white text-4xl font-light mt-5 italic ">{this.state.tagline}</h2>
                                <h4 className="text-white text-xl font-ligth mt-20"> Adult: {this.state.adult} • Genres • Rating: ★★★★☆ • Runtime: {this.state.runtime} min</h4>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}