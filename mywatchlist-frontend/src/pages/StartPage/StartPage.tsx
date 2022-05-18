import { Component } from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { discoverMovie, discoverTV, getTrendingPerDay } from "../../api/API";
import ListElement from "../../components/List/ListElement";
import { apiConfig } from "../../Config";
import Trending from "../../components/Startpage/Trending";
import ListOverview from "../../components/List/ListOverview";

interface StartPageProps {}

interface StartPageState {
    trendingDay;
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
            trendingDay: [],
            discoverMovie: [],
            discoverTV: [],
        };
    }
    async componentDidMount() {
        var resultsTrending = await getTrendingPerDay();
        this.setState(
            {
                trendingDay: resultsTrending.data.results,
            },
            async () => {
                var resultsMovie = await discoverMovie();
                this.setState(
                    {
                        discoverMovie: resultsMovie.data.results,
                    },
                    async () => {
                        var resultsTV = await discoverTV();
                        this.setState({
                            discoverTV: resultsTV.data.results,
                        });
                    }
                );
            }
        );
    }
    render() {
        return (
            <main className="grid-rows-2">
                <Trending trendingList={this.state.trendingDay} />
                <div className="p-5 relative -top-48 z-10">
                    <h1 className="font-bold text-3xl text-dark_text drop-shadow-xl">
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
                                    type="movie"
                                    key={movie.id}
                                    showAddToList={true}
                                    showDeleteFromList={false}
                                />
                            </div>
                        ))}
                    </Flicking>
                </div>
                <div className="p-5 relative -top-48 z-10">
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
                                    type="tv"
                                    key={movie.id}
                                    showAddToList={true}
                                    showDeleteFromList={false}
                                />
                            </div>
                        ))}
                    </Flicking>
                </div>
            </main>
        );
    }
}
