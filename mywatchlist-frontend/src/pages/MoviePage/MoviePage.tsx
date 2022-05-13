import { Component } from "react";
import { useParams } from "react-router-dom";
import { getMovieImages } from "../../api/API";
import { apiConfig } from "../../Config";


export default class MoviePage extends Component<{}, { movieID: number, poster: string, backdrop: string }> {

    constructor(props) {
        super(props);
        this.state = {
            movieID: 0,
            poster: "",
            backdrop: "",
        };
    }
    async componentDidMount() {
        //const params = useParams();
        //var movieID = parseInt(params.id as string);
        var movieID = 675353;
        var movieImages = await getMovieImages(movieID);
        var posters = movieImages.data.posters;
        var backdrops = movieImages.data.backdrops;
        this.setState({
            poster: apiConfig.originalImage(posters[0].file_path),
            backdrop: apiConfig.originalImage(backdrops[0].file_path),
        });
    }
    render() {
        return (
            <div>
                <div className="bg-gradient-to-tl from-black via-transparent to-transparent h-96 w-full bg-cover bg-center relative">
                    <img src={this.state.backdrop} className="w-full h-full object-cover absolute mix-blend-overlay" />
                    <div className="grid-background absolute inset-0 p-2 grid grid-cols-12 gap-0">
                        <div className="col-span-1"></div>
                        <div className="col-span-2">
                            <img src={this.state.poster} className="h-auto w-auto object-cover rounded-lg border-2 border-white shadow-2xl shadow-black" />
                        </div>
                        <div className="col-span-9">
                            <div className="p-24 absolute">
                                <h1 className="text-white text-6xl font-bold">This is the movie title</h1>
                                <h2 className="text-white text-3xl font light mt-5">Some more space for subtitles.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}