import React, { Component } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { backendURL } from "../../Config";
import Card from "../Wrapper/Card";
import MailInput from "./MailInput";
import PasswordInput from "./PasswordInput";
import UsernameInput from "./UserNameInput";

interface RegistrationProps {}

interface RegistrationFormState {
    isRegistered: boolean;
    isPasswordValid: boolean;
    isMailValid: boolean;
    isUsernameValid: boolean;
    isPrivacyChecked: boolean;
}

interface RegistrationFormInformation {
    username: string;
    email: string;
    password: string;
}

class RegistrationForm extends Component<
    RegistrationProps,
    RegistrationFormState
> {
    information: RegistrationFormInformation = {
        username: "",
        email: "",
        password: "",
    };

    constructor(props: RegistrationProps) {
        super(props);
        this.state = {
            isRegistered: false,
            isPasswordValid: false,
            isMailValid: false,
            isUsernameValid: false,
            isPrivacyChecked: false,
        };
    }

    submit_registration = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (!this.state.isUsernameValid) {
            toast.error("Username is not valid.");
            return;
        } else if (!this.state.isMailValid) {
            toast.error("E-Mail is not valid.");
            return;
        } else if (!this.state.isPasswordValid) {
            toast.error("Password is not valid.");
            return;
        } else {
            var httpStatus = 0;
            var respone_text = "";

            await fetch(backendURL + "/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.information),
            })
                .then((response) => {
                    httpStatus = response.status;
                    return response.json();
                })
                .then((data) => (respone_text = data.response));

            if (httpStatus === 201) {
                toast.success("User created.");
                this.setState({ isRegistered: true });
            } else {
                toast.error(respone_text);
            }
        }
    };

    render() {
        return (
            <Card classes="w-full md:w-1/2 xl:w-1/4 mx-auto p-5 lg:p-10 rounded">
                {this.state.isRegistered ? (
                    <Navigate to="/login" />
                ) : (
                    <form onSubmit={this.submit_registration}>
                        <UsernameInput
                            handleInput={(
                                username: string,
                                isValid: boolean
                            ) => {
                                this.information.username = username;
                                this.setState({ isUsernameValid: isValid });
                            }}
                        />

                        <MailInput
                            title="E-Mail"
                            handleInput={(mail: string, isValid: boolean) => {
                                this.information.email = mail;
                                this.setState({ isMailValid: isValid });
                            }}
                        />

                        <PasswordInput
                            handleInput={(
                                password: string,
                                isPasswordValid: boolean
                            ) => {
                                this.information.password = password;
                                this.setState({
                                    isPasswordValid: isPasswordValid,
                                });
                            }}
                        />

                        <div>
                            <input
                                type="checkbox"
                                name="privacy"
                                onChange={(e) =>
                                    this.setState({
                                        isPrivacyChecked: e.target.checked,
                                    })
                                }
                                required
                                className="appearance-none h-5 w-5 border border-border_primary rounded-md bg-transparent checked:bg-primary_green checked:border-primary_green transition duration-200 mt-1 float-left cursor-pointer"
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
                            className={
                                this.state.isMailValid &&
                                this.state.isPasswordValid &&
                                this.state.isUsernameValid &&
                                this.state.isPrivacyChecked
                                    ? "mt-5 w-full p-2 text-white dark:text-dark_bg border border-primary_green rounded cursor-pointer bg-primary_green hover:bg-primary_green-100 hover:border-primary_green-100"
                                    : "mt-5 w-full p-2 text-white dark:text-dark_bg border border-primary rounded cursor-pointer bg-primary hover:bg-primary-100 hover:border-primary-100"
                            }
                            type="submit"
                            value="Sign up"
                        />
                    </form>
                )}
            </Card>
        );
    }
}

export default RegistrationForm;
