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
                    <form className="w-full md:w-1/2 xl:w-1/4 mx-auto p-5 lg:p-10 border border-border_primary rounded" onSubmit={this.submit_registration}>
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
                            className="bg-transparent border border-border_primary w-full p-2 mb-5 rounded focus:outline-none focus:border-primary transition-all duration-500 text-black dark:text-white"
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
                            className="bg-transparent border border-border_primary w-full p-2 rounded focus:outline-none focus:border-primary transition-all duration-500 text-black dark:text-white focus:invalid:border-primary-400 peer"
                            required
                        />
                        <p className="opacity-0 peer-invalid:peer-focus:opacity-100 text-primary-400 text-sm mb-2 after:text-red-500 transition-all duration-200">
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
                            className="bg-transparent border border-border_primary w-full p-2 mb-5 rounded focus:outline-none focus:border-primary transition-all duration-500 text-black dark:text-white"
                            required
                        />
                        <div>
                            <input
                                type="checkbox"
                                name="privacy"
                                required
                                className="appearance-none h-5 w-5 border border-border_primary rounded-md bg-transparent checked:bg-primary checked:border-primary transition duration-200 mt-1 float-left cursor-pointer"
                            />
                            <label className="pl-2 text-dark dark:text-white">
                                <span>
                                    I agree to the{" "}
                                    <Link
                                        to="/privacy"
                                        className="underline hover:text-primary"
                                    >
                                        privacy policy
                                    </Link>
                                </span>
                            </label>
                        </div>
                        <input
                            className="mt-5 w-full p-2 text-white dark:text-dark_bg border border-primary rounded cursor-pointer bg-primary hover:bg-primary-100 hover:border-primary-100"
                            type="submit"
                            value="Sign up"
                        />
                    </form>
                )}
            </div>
        );
    }
}

export default Registration;
