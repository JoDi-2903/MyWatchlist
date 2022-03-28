import { Component } from "react";
import { Link } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Search from "../Search/Search";

class Navbar extends Component {
    render() {
        return (
            <nav className="bg-white_navbar dark:bg-dark_navbar py-5 px-5 lg:px-20 grid grid-cols-1 lg:grid-cols-3  w-full justify-between align-middle">
                <Link to="/" className="flex items-center gap-3 m-2 justify-self-center lg:justify-self-begin">
                    <img alt="Logo" src="Logo.svg" className="h-10" />
                    <span className="text-3xl white:text-dark dark:text-white">
                        MyWatchlist
                    </span>
                </Link>

                <Search/>

                <div className="flex items-center gap-1 justify-self-center lg:justify-self-end m-2">
                    <ThemeSwitch />
                    <Link
                        to="/login"
                        className="py-1 px-3 hover:text-color_primary dark:text-white text-dark dark:hover:text-color_primary"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="p-2 dark:text-white text-dark border border-color_primary rounded-lg shadow hover:bg-color_primary dark:hover:text-dark_navbar"
                    >
                        Sign up
                    </Link>
                </div>
            </nav>
        );
    }
}

export default Navbar;
