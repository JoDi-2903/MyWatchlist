import { Component } from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { discoverMovie, discoverTV, getTVImages } from "../../api/API";
import { apiConfig } from "../../Config";
import Card from "../../components/Wrapper/Card";
import ListElement from "../../components/List/ListElement";

interface StartPageProps {}

interface StartPageState {
    discoverMovie;
    discoverTV;
}

export default class StartPage extends Component<
    StartPageProps,
    StartPageState
> {
    constructor(props: StartPageProps) {
        super(props);
        this.state = {
            discoverMovie: [],
            discoverTV: [],
        };
    }
    async componentDidMount() {
        var resultsMovie = await discoverMovie();
        var resultsTV = await discoverTV();
        this.setState({
            discoverMovie: resultsMovie.data.results,
            discoverTV: resultsTV.data.results,
        });
    }
    render() {
        return (
            <main className="p-5">
                <div>
                    <h1 className="font-bold text-3xl text-white_text dark:text-dark_text">
                        Discover movies
                    </h1>
                    <Flicking
                        circular={false}
                        renderOnlyVisible={true}
                        align={"prev"}
                    >
                        {this.state.discoverMovie.map((movie) => (
                            <div key={movie.id}>
                                <ListElement
                                    id={movie.id}
                                    title={movie.original_title}
                                    poster_path={movie.poster_path}
                                    vote_average={movie.vote_average}
                                    first_air_date={movie.release_date}
                                    type="movie"
                                    key={movie.id}
                                />
                            </div>
                        ))}
                    </Flicking>
                </div>
                <div>
                    <h1 className="font-bold text-3xl text-white_text dark:text-dark_text">
                        Discover TV shows
                    </h1>
                    <Flicking
                        circular={false}
                        renderOnlyVisible={true}
                        align={"prev"}
                    >
                        {this.state.discoverTV.map((movie) => (
                            <div key={movie.id}>
                                <ListElement
                                    id={movie.id}
                                    title={movie.original_name}
                                    poster_path={movie.poster_path}
                                    vote_average={movie.vote_average}
                                    first_air_date={movie.first_air_date}
                                    type="tv"
                                    key={movie.id}
                                />
                            </div>
                        ))}
                    </Flicking>
                </div>
            </main>
        );
    }
}
