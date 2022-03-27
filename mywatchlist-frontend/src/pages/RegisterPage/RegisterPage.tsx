import { Component } from "react";
import { Link } from "react-router-dom";

export default class RegisterPage extends Component {
    render() {
        return (
            <div className="max-w-2xl mx-auto my-28">
                <form className="bg-white_box dark:bg-dark_box border border-black dark:border-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-black dark:text-white text-sm font-bold mb-2" >
                            Username
                        </label>
                        <input className="shadow appearance-none border border-black dark:border-white rounded-lg w-full py-2 px-3 text-black dark:text-white bg-white dark:bg-dark_bg leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black dark:text-white text-sm font-bold mb-2" >
                            E-Mail
                        </label>
                        <input className="shadow appearance-none border border-black dark:border-white rounded-lg w-full py-2 px-3 text-black dark:text-white bg-white dark:bg-dark_bg leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="E-Mail" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-black dark:text-white text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input className="shadow appearance-none border border-black dark:border-white rounded-lg w-full py-2 px-3 text-black dark:text-white bg-white dark:bg-dark_bg mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                    </div>
                    <div className="mb-6">
                        <label className="flex items-center">
                            <input className="form-check-input appearance-none h-4 w-4 border border-color_primary rounded-md bg-white checked:bg-color_primary checked:border-black dark:checked:border-white  checked: focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"></input>
                            <span className="ml-2 text-black dark:text-white">I agree to the <Link to="/privacy" className="hover:text-color_primary"><span className="underline">privacy policy</span></Link></span>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-color_primary hover:bg-color_secondary-200 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="button">
                            Register
                        </button>
                        <p className="text-red-500 text-xs italic">This username is already taken.</p>
                    </div>
                </form>
                <p className="text-center text-gray-500 dark:text-gray-300 text-xs">
                    &copy;2022 MyWatchlist Corp. All rights reserved.
                </p>
            </div>
        )
    }
}