import { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFoundPage extends Component {
    render() {
        return (
            <div className="w-2/3gg mx-auto grid grid-column-1">
                <h1 className="text-center text-9xl text-primary m-5">
                    404
                </h1>
                <p className="text-black dark:text-white text-center text-3xl my-5">The page you were trying to access does not exist.</p>
                <Link
                        to="/"
                        className="mt-5 w-1/5 p-2 text-white text-dark border border-primary rounded cursor-pointer bg-primary hover:bg-primary-100 text-center mx-auto"
                    >
                        Return to the HomePage
                    </Link>
            </div>
        );
    }
}
