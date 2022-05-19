import { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <div>
                <div className="bg-white_navbar dark:bg-dark_navbar py-5 px-5 lg:px-20 grid grid-cols-1 md:grid-cols-2 w-full justify-between align-middle top-full">
                    <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center gap-3 justify-self-center lg:justify-self-start">
                            <img alt="Logo" src="TMDB_Logo.svg" className="h-3" />
                            <span className="text-sm text-white">
                                This product uses the TMDB API but is not endorsed or certified by TMDB.
                            </span>
                        </div>
                    </a>
                    <div className="justify-self-center lg:justify-self-end flex items-center gap-5">
                        <Link
                            to="/privacy"
                            className="flex items-center gap-3 justify-self-center lg:justify-self-start"
                        >
                            <span className="text-sm text-white"> Imprint and Privacy policy</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;