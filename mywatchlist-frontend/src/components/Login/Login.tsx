import React, { Component } from "react";
import { backendURL } from "../../Config";

interface LoginInformation {
    username: string;
    password: string;
}

class Login extends Component {
    information: LoginInformation = {
        username: "",
        password: "",
    };

    submit_login = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log(this.information);
        fetch(backendURL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.information),
        }).then((response) => {
            //console.log(response);
        });
    };

    render() {
        return (
            <form
                onSubmit={this.submit_login}
                className="border border-border_primary rounded p-8 w-full md:w-1/2 xl:w-1/4 mx-auto"
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
                    className="bg-transparent border border-border_primary w-full p-2 mb-5 rounded focus:outline-none focus:border-primary transition-all duration-500 text-black dark:text-white"
                    onChange={(e) =>
                        (this.information.username = e.target.value)
                    }
                />

                <div className="grid grid-cols-2 items-center">
                    <label
                        htmlFor="password"
                        className="justify-self-start block text-black dark:text-white text-md font-bold mb-2"
                    >
                        Password
                    </label>

                    <a
                        href="https://youtu.be/dQw4w9WgXcQ"
                        target="_blank"
                        className="justify-self-end text-sm text-primary hover:text-primary-100"
                    >
                        Forgot Password?
                    </a>
                </div>

                <input
                    type="password"
                    name="password"
                    className="bg-transparent border border-border_primary w-full p-2 mb-5 rounded focus:outline-none focus:border-primary transition-all duration-500 text-black dark:text-white"
                    onChange={(e) =>
                        (this.information.password = e.target.value)
                    }
                />
                <input
                    type="submit"
                    value="Sign in"
                    className="w-full p-2 text-white dark:text-dark_bg border border-primary rounded cursor-pointer bg-primary hover:bg-primary-100 hover:border-primary-100"
                />
            </form>
        );
    }
}

export default Login;
