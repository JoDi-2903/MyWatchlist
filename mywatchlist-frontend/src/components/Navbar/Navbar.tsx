import { Component } from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

class Navbar extends Component {
    render() {
        return (
            <nav className="bg-white_navbar dark:bg-dark_navbar">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-between">
                        <Link to="/" className="flex items-center space-x-3 m-5">
                            <img alt="Logo" src="Logo.svg" className="h-10" />
                            <span className="text-3xl white:text-dark dark:text-white">
                                MyWatchlist
                            </span>
                        </Link>

                        <div className="flex items-center space-x-1">
                            Searchbar
                        </div>

                        <div className="flex items-center space-x-1">
                            <ToggleTheme />
                            <Link to="/login" className="py-1 px-3 dark:text-white text-dark">Login</Link>
                            <Link to="/register" className="p-2 dark:text-white text-dark border border-emerald-300 rounded shadow">Signup</Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
