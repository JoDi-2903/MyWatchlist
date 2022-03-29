import { Component } from "react";
import Login from "../../components/Login/Login";

export default class LoginPage extends Component {
    render() {
        return (
            <main className="p-10">
                <h1 className="text-center text-black dark:text-white text-4xl m-5">
                    Sign in into <span className="text-primary">MyWatchlist</span>
                </h1>
                <Login />
                <p className="text-center text-gray-500 dark:text-gray-300 text-xs m-2">
                    &copy; 2022 MyWatchlist
                </p>
            </main>
        );
    }
}