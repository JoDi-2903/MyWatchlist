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
            poster: apiConfig.w500Image(posters[0].file_path),
            backdrop: apiConfig.w500Image(backdrops[0].file_path),
        });
    }
    render() {
        return (
            <div className="flex justify-center mx-auto my-10 p-10 w-3/4 m-2">
                <h2 className="font-extrabold text-7x1 text-center text-blue-400">Movie details: {this.state.movieID}</h2>
                <img src={this.state.poster} className="w-1/2" />
                <img src={this.state.backdrop} className="w-1/2" />
            </div>
        );
    }
}