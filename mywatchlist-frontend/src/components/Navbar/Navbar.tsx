import { Component } from "react";
import { Link } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

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
                            <div className="relative mx-auto text-black dark:text-white">
                                <input className="border-2 border-black dark:border-white bg-white dark:bg-dark_bg h-10 px-4 pr-44 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search"/>
                                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                                    <svg className="text-color_primary hover:text-black dark:hover:text-white h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-1">
                            <ThemeSwitch />
                            <Link to="/login" className="py-1 px-3 hover:text-color_primary dark:text-white text-dark dark:hover:text-color_primary">Login</Link>
                            <Link to="/register" className="p-2 dark:text-white text-dark border border-color_primary rounded-lg shadow hover:bg-color_primary dark:hover:text-dark_navbar">Sign up</Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
