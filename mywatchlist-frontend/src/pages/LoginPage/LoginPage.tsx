import { Component } from "react";

export default class LoginPage extends Component {
    render() {
        return (
            <div className="max-w-2xl mx-auto my-28"> 
                <form className="bg-white_box dark:bg-dark_box shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-black dark:text-white text-sm font-bold mb-2" >
                            Username
                        </label>
                        <input className="shadow appearance-none border border-black dark:border-white rounded-lg w-full py-2 px-3 text-black dark:text-white bg-white dark:bg-dark_bg leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-black dark:text-white text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input className="shadow appearance-none border border-black dark:border-white rounded-lg w-full py-2 px-3 text-black dark:text-white bg-white dark:bg-dark_bg mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
                            <p className="text-red-500 text-xs italic">The login data is incorrect.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-color_primary hover:bg-color_secondary-200 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-color_primary hover:text-color_secondary-200" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 dark:text-gray-300 text-xs">
                    &copy;2022 MyWatchlist Corp. All rights reserved.
                </p>
            </div>
        )
    }
}