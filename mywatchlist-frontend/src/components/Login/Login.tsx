import React, { Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import Card from "../Wrapper/Card";

interface LoginInformation {
    username: string;
    password: string;
}

interface LoginProps {
    changeJWT: Function;
    isLoggedIn: boolean;
}

interface LoginState {}

class Login extends Component<LoginProps, LoginState> {
    information: LoginInformation = {
        username: "",
        password: "",
    };

    submit_login = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        let status: number = 0;
        let token: string = "";

        await fetch(backendURL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.information),
        }).then((response) => {
            status = response.status;
            token = response.headers
                .get("authorization")
                ?.split(" ")[1] as string;
        });

        if (status === 200) {
            this.props.changeJWT(token);
        } else {
            toast.error("Login failed. Please try again.");
        }
    };

    render() {
        return (
            <Card classes="p-8 w-full md:w-1/2 xl:w-1/4 mx-auto rounded">
                <form onSubmit={this.submit_login}>
                    <label
                        htmlFor="username"
                        className="block text-black dark:text-white text-md font-bold mb-2"
                    >
                        Username
                    </label>
                    <div className="z-0 flex justify-self-center align-middle w-full p-2 bg-white dark:bg-dark_input rounded drop-shadow mb-8">
                        <input
                            type="text"
                            name="username"
                            onChange={(e) =>
                                (this.information.username = e.target.value)
                            }
                            className="h-8 p-2 text-lg focus:outline-none w-full bg-transparent text-white_text dark:text-white"
                        />
                    </div>

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
                            rel="noreferrer"
                            className="justify-self-end text-sm text-primary hover:text-primary-100"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    <div className="z-0 flex justify-self-center align-middle w-full p-2 bg-white dark:bg-dark_input rounded drop-shadow mb-8">
                        <input
                            type="password"
                            name="password"
                            onChange={(e) =>
                                (this.information.password = e.target.value)
                            }
                            className="h-8 p-2 text-lg focus:outline-none w-full bg-transparent text-white_text dark:text-white"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Sign in"
                        className="w-full p-2 text-white dark:text-dark_bg border border-primary rounded cursor-pointer bg-primary hover:bg-primary-100 hover:border-primary-100"
                    />
                </form>
            </Card>
        );
    }
}

export default Login;
