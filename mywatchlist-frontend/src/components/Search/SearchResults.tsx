import { Component } from "react";
import ListElement from "../List/ListElement";

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
                <div className="mx-auto w-full xl:w-full mt-10 grid grid-cols-1">
                    <h1 className="text-black dark:text-white text-5xl">
                        Movies
                    </h1>
                    <p className="text-black dark:text-white mb-5">
                        Total Results: {this.state.resultMovie.total_results}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {this.state.resultMovie.results !== undefined ? (
                            this.state.resultMovie.results.map((result) => (
                                <ListElement
                                    id={result.id}
                                    type="movie"
                                    key={result.id}
                                    showAddToList={true}
                                />
                            ))
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
                <div className="mx-auto w-full xl:w-full mt-10 grid grid-cols-1">
                    <h1 className="text-black dark:text-white text-5xl">
                        TV Shows
                    </h1>
                    <p className="text-black dark:text-white mb-5">
                        Total Results: {this.state.resultTV.total_results}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {this.state.resultTV.results !== undefined ? (
                            this.state.resultTV.results.map((result) => (
                                <ListElement
                                    id={result.id}
                                    type="tv"
                                    key={result.id}
                                    showAddToList={true}
                                />
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
