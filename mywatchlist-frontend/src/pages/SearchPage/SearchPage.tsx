import { Component } from "react";
import { Navigate } from "react-router-dom";
import { searchMovie, searchTV } from "../../api/API";
import Search from "../../components/Search/Search";
import SearchFilter from "../../components/Search/SearchFilter";
import SearchResults from "../../components/Search/SearchResults";
import { isLoggedIn, JWTContext } from "../../security/JWTContext";

interface SearchPageProps {}

interface SearchPageState {
    query: string;
    resultMovie;
    resultTV;
}

class SearchPage extends Component<SearchPageProps, SearchPageState> {
    constructor(props: SearchPageProps) {
        super(props);
        this.state = {
            query: "",
            resultMovie: {},
            resultTV: {},
        };
    }

    async search() {
        if (this.state.query.length > 3) {
            var responseMovie = await searchMovie("&query=" + this.state.query);
            var responseTV = await searchTV("&query=" + this.state.query);
            this.setState({
                resultMovie: responseMovie.data,
                resultTV: responseTV.data,
            });
        }
    }

    render() {
        return (
            <JWTContext.Consumer>
                {({ jwtInfo, changeJWT }) => (
                    <main className="w-full md:w-11/12 mx-auto my-10 p-5 flex justify-center">
                        {isLoggedIn(jwtInfo.jwt) ? (
                            <div className="w-3/4">
                                <h1 className="text-black dark:text-white text-4xl">
                                    Search
                                </h1>
                                <div className="w-full grid grid-cols-1 justify-start">
                                    <Search
                                        onSearchChange={(query: string) =>
                                            this.setState(
                                                { query: query },
                                                () => this.search()
                                            )
                                        }
                                    />
                                    {/* <SearchFilter updateValues={(value) => console.log(value)}/> */}
                                    <SearchResults
                                        resultMovie={this.state.resultMovie}
                                        resultTV={this.state.resultTV}
                                    />
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )}
                    </main>
                )}
            </JWTContext.Consumer>
        );
    }
}

export default SearchPage;
