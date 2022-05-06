import ReactStars from "react-rating-stars-component";
import { Component } from "react";
import { Link } from "react-router-dom";
import { apiConfig } from "../../Config";

interface SearchResultsProps {
    resultMovie;
    resultTV;
}

interface SearchResultsState {
    resultMovie;
    resultTV;
}

class SearchResults extends Component<SearchResultsProps, SearchResultsState> {
    constructor(props: SearchResultsProps) {
        super(props);
        this.state = {
            resultMovie: this.props.resultMovie,
            resultTV: this.props.resultTV,
        };
    }

    componentDidUpdate() {
        if (this.state.resultMovie !== this.props.resultMovie) {
            this.setState({
                resultMovie: this.props.resultMovie,
            });
        }
        if (this.state.resultTV !== this.props.resultTV) {
            this.setState({
                resultTV: this.props.resultTV,
            });
        }
    }

    render() {
        return (
            <div>
                <div className="mx-auto w-3/4 xl:w-full">
                    <h1 className="text-black dark:text-white text-5xl">
                        Movies
                    </h1>
                    <p className="text-black dark:text-white mb-5">
                        Total Results: {this.state.resultMovie.total_results}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5">
                        {this.state.resultMovie.results !== undefined ? (
                            this.state.resultMovie.results.map((result) => (
                                <div className="m-2 border bg-white dark:bg-dark_navbar dark:border-dark_navbar rounded-sm flex justify-start drop-shadow-xl gap-3 p-3 w-80 h-44">
                                    <img
                                        src={apiConfig.w500Image(
                                            result.poster_path
                                        )}
                                        alt={result.original_title}
                                        className="h-40 relative -top-5 drop-shadow-xl"
                                    />
                                    <div className="grid grid-cols-1 items-start content-start overflow-hidden">
                                        <Link to={"/movie/" + result.id}>
                                            <h1 className="text-black dark:text-white text-xl">
                                                {result.original_title}
                                            </h1>
                                        </Link>
                                        <ReactStars
                                            value={result.vote_average / 2}
                                            edit={false}
                                            size="20"
                                        />

                                        <p className="self-start text-black dark:text-white text-xs w-full">
                                            Release: {result.release_date}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
                <div className="mx-auto w-3/4 xl:w-full mt-10">
                    <h1 className="text-black dark:text-white text-5xl">
                        TV Shows
                    </h1>
                    <p className="text-black dark:text-white mb-5">
                        Total Results: {this.state.resultTV.total_results}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5">
                        {this.state.resultTV.results !== undefined ? (
                            this.state.resultTV.results.map((result) => (
                                <div className="m-2 border bg-white dark:bg-dark_navbar dark:border-dark_navbar rounded-sm flex justify-start gap-3 drop-shadow p-3 w-80 h-44">
                                    <img
                                        src={apiConfig.w500Image(
                                            result.poster_path
                                        )}
                                        alt={result.original_name}
                                        className="h-40 relative -top-5 drop-shadow-lg"
                                    />
                                    <div className="grid grid-cols-1 items-start content-start">
                                        <Link to={"/tv/" + result.id}>
                                            <h1 className="text-black dark:text-white text-xl">
                                                {result.original_name}
                                            </h1>
                                        </Link>
                                        <ReactStars
                                            value={result.vote_average / 2}
                                            edit={false}
                                            size="20"
                                        />
                                        <p className="self-start text-black dark:text-white text-xs w-full">
                                            First aired on:{" "}
                                            {result.first_air_date}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResults;
