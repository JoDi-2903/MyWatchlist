import { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFoundPage extends Component {
    render() {
        return (
            <div className="w-2/3 mx-auto grid grid-column-1">
                <h1 className="text-center text-9xl text-black dark:text-white m-5">
                    404
                </h1>
                <p className="text-black dark:text-white text-center text-3xl my-5">The page you were trying to access does not exist.</p>
                <Link
                        to="/"
                        className="p-2 dark:text-white text-dark border border-color_primary rounded-lg shadow hover:bg-color_primary dark:hover:text-dark_navbar mx-auto"
                    >
                        Return to the HomePage
                    </Link>
            </div>
        );
    }
}
