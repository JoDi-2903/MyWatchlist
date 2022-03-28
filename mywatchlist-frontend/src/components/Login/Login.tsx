import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
    submit_login = async (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    render() {
        return (
            <form
                onSubmit={this.submit_login}
                className="border border-gray-200 dark:border-white rounded-lg p-8 w-full lg:w-3/5 xl:w-2/5 mx-auto"
            >
                <label
                    htmlFor="username"
                    className="block text-black dark:text-white text-md font-bold mb-2"
                >
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    className="bg-transparent border w-full p-2 mb-5 rounded-md focus:outline-none focus:border-color_primary transition-all duration-500 text-black dark:text-white"
                />

                <label
                    htmlFor="password"
                    className="block text-black dark:text-white text-md font-bold mb-2"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    className="bg-transparent border w-full p-2 mb-5 rounded-md focus:outline-none focus:border-color_primary transition-all duration-500 text-black dark:text-white"
                />
                <div className="flex items-center justify-between">
                    <input
                        type="submit"
                        value="Submit"
                        className="mt-5 w-1/5 p-2 dark:text-white text-dark border border-color_primary rounded-lg cursor-pointer hover:bg-color_primary dark:hover:text-dark_navbar"
                    />

                    <Link
                        to="/forgot"
                        className="inline-block align-baseline font-bold text-sm text-color_primary hover:text-color_secondary-200"
                    >
                        Forgot Password?
                    </Link>
                </div>
            </form>
        );
    }
}

export default Login;
