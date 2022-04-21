import { Component } from "react";
import { Link } from "react-router-dom";

import MovieList from '../../components/MovieList/MovieList';
import { category, movieType, tvType } from "../../api/tmdbApi";

export default class StartPage extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Trending Movies</h2>
                        </div>
                        <MovieList category={category.movie} type={movieType.popular} />
                    </div>
                </div>
            </>
        )
    }
}