import React, { Component } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import MailInput from "./MailInput";
import PasswordInput from "./PasswordInput";
import UserInput from "./UserInput";

interface RegistrationProps {}

interface RegistrationFormState {
    isRegistered: boolean;
    isPasswordValid: boolean;
    isMailValid: boolean;
    isUsernameValid: boolean;
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
        };
    }

    submit_registration = (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (
            this.state.isUsernameValid &&
            this.state.isMailValid &&
            this.state.isPasswordValid
        ) {
            this.setState({ isRegistered: true });
        } else {
            toast.error("Something is not valid!");
        }

    };

    render() {
        return (
            <div>
                {this.state.isRegistered ? (
                    <Navigate to="/login" />
                ) : (
                    <form
                        className="w-full md:w-1/2 xl:w-1/4 mx-auto p-5 lg:p-10 border border-border_primary rounded"
                        onSubmit={this.submit_registration}
                    >
                        <UserInput
                            handleInput={(
                                username: string,
                                isValid: boolean
                            ) => {
                                this.information.username = username;
                                this.setState({ isUsernameValid: isValid });
                            }}
                        />

                        <MailInput
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

export default RegistrationForm;
