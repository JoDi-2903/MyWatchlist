import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";

interface RegistrationState {
    isRegistered: boolean;
}

interface RegistrationInformation {
    username: string,
    email: string,
    password: string
}

class Registration extends Component<{}, RegistrationState> {
    
    information: RegistrationInformation = {
        username: "",
        email: "",
        password: ""
    }
    
    constructor(props: RegistrationState) {
        super(props);
        this.state = { isRegistered: false };
    }

    submit_registration = (event: React.SyntheticEvent) => {
        event.preventDefault();

        // API call here
        console.log(this.information)

        this.setState({ isRegistered: true });
    };

    render() {
        return (
            <div>
                {this.state.isRegistered ? (
                    <Navigate to="/login" />
                ) : (
                    <form className="w-full lg:w-3/5 xl:w-2/5 mx-auto p-5 lg:p-10 border border-gray-200 dark:border-white rounded-lg" onSubmit={this.submit_registration}>
                        <label
                            htmlFor="username"
                            className="block text-black dark:text-white text-md font-bold mb-2"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            onChange={(e) => {this.information.username = e.target.value}}
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
                            type="email"
                            onChange={(e) => {this.information.email = e.target.value}}
                            className="bg-transparent border w-full p-2 rounded-md focus:outline-none focus:border-color_primary transition-all duration-500 text-black dark:text-white focus:invalid:border-pink-500 peer"
                            required
                        />
                        <p className="opacity-0 peer-invalid:peer-focus:opacity-100 text-pink-600 text-sm mb-2 after:text-red-500 transition-all duration-200">
                            Please provide a valid email address.
                        </p>
                        <label
                            htmlFor="password"
                            className="block text-black dark:text-white text-md font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            onChange={(e) => {this.information.password = e.target.value}}
                            className="bg-transparent border w-full p-2 mb-5 rounded-md focus:outline-none focus:border-color_primary transition-all duration-500 text-black dark:text-white"
                            required
                        />
                        <div>
                            <input
                                type="checkbox"
                                name="privacy"
                                required
                                className="appearance-none h-5 w-5 border border-white rounded-md bg-transparent border-gray-300 dark:border-white checked:bg-color_primary checked:border-color_primary dark:checked:border-color_primary transition duration-200 mt-1 float-left cursor-pointer"
                            />
                            <label className="pl-2 text-dark dark:text-white">
                                <span>
                                    I agree to the{" "}
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
                            className="mt-5 w-1/3 p-2 dark:text-white text-dark border border-color_primary rounded-lg cursor-pointer hover:bg-color_primary dark:hover:text-dark_navbar"
                            type="submit"
                            value="Submit"
                        />
                    </form>
                )}
            </div>
        );
    }
}

export default Registration;
