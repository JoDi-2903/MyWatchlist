import { Component } from "react";
import { Link } from "react-router-dom";

class Registration extends Component {
    render() {
        return (
            <main>
                <h1 className="text-center text-black dark:text-white text-4xl m-5">
                    Register
                </h1>
                <form className="w-full lg:w-3/5 xl:w-2/5 mx-auto p-5 lg:p-10 border border-gray-200 dark:border-white rounded-lg">
                    <label
                        htmlFor="username"
                        className="block text-black dark:text-white text-md font-bold mb-2"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="bg-transparent border w-full p-2 mb-5 rounded-md focus:outline-none focus:border-color_primary transition-all duration-500 text-black dark:text-white"
                        required
                    />
                    <label
                        htmlFor="email"
                        className="block text-black dark:text-white text-md font-bold mb-2"
                    >
                        E-Mail
                    </label>
                    <input
                        id="email"
                        type="text"
                        className="bg-transparent border w-full p-2 mb-5 rounded-md focus:outline-none focus:border-color_primary transition-all duration-500 text-black dark:text-white"
                        required
                    />
                    <label
                        htmlFor="password"
                        className="block text-black dark:text-white text-md font-bold mb-2"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="bg-transparent border w-full p-2 mb-5 rounded-md focus:outline-none focus:border-color_primary transition-all duration-500 text-black dark:text-white"
                        required
                    />
                    <div>
                        <input type="checkbox" name="privacy" className="appearance-none h-5 w-5 border border-white rounded-md bg-transparent checked:bg-color_primary checked:border-black dark:checked:border-color_primary transition duration-200 mt-1 float-left cursor-pointer" />
                        <label className="pl-2 text-dark dark:text-white">
                            <span>
                                I agree to the {" "}
                                <Link
                                    to="/privacy"
                                    className="underline text-dark dark:text-white hover:dark:text-color_primary"
                                >
                                    privacy policy
                                </Link>
                            </span>
                        </label>
                    </div>
                    <input
                        className="mt-5 w-1/3 p-2 dark:text-white text-dark border border-color_primary rounded-lg cursor-pointer shadow hover:bg-color_primary dark:hover:text-dark_navbar"
                        type="submit"
                        value="Submit"
                    />
                </form>
                <p className="text-center text-gray-500 dark:text-gray-300 text-xs m-2">
                    &copy;2022 MyWatchlist Corp. All rights reserved.
                </p>
            </main>
        );
    }
}

export default Registration;
