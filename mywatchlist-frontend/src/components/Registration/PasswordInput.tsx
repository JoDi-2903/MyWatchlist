import {
    CheckIcon,
    QuestionMarkCircleIcon,
    XIcon,
} from "@heroicons/react/solid";
import { Line } from "rc-progress";
import React, { Component } from "react";

interface PasswordInputProps {
    handleInput;
}

interface PasswordInputState {
    password: string;
    isPasswordValid: boolean;
    isUppercasePresent: boolean;
    isLowercasePresent: boolean;
    isNumberPresent: boolean;
    isSpecialCharacterPresent: boolean;
    isLengthValid: boolean;
    showHelp: boolean;
    isFocused: boolean;
}

class PasswordInput extends Component<PasswordInputProps, PasswordInputState> {
    constructor(props: PasswordInputProps) {
        super(props);
        this.state = {
            password: "",
            isPasswordValid: false,
            isUppercasePresent: false,
            isLowercasePresent: false,
            isNumberPresent: false,
            isSpecialCharacterPresent: false,
            isLengthValid: false,
            showHelp: false,
            isFocused: false,
        };
    }

    handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.target.value }, () => {
            var matchesUpper = (this.state.password.match("(?=[A-Z]).") || [])
                .length;
            var matchesLower = (this.state.password.match("(?=[a-z]).") || [])
                .length;
            var matchesNumber = (this.state.password.match("(?=[0-9]).") || [])
                .length;
            var matchesSpecial = (
                this.state.password.match(
                    "(?=[!\"#$§€%&'+,./:;=?@\\^`|~\\-_\\(\\)\\[\\]])."
                ) || []
            ).length;

            // Checks
            this.setState(
                {
                    isUppercasePresent: matchesUpper > 0,
                    isLowercasePresent: matchesLower > 0,
                    isNumberPresent: matchesNumber > 0,
                    isSpecialCharacterPresent: matchesSpecial > 0,
                    isLengthValid:
                        this.state.password.length >= 8 &&
                        this.state.password.length <= 50,
                },
                () => {
                    this.setState(
                        {
                            isPasswordValid:
                                this.state.isUppercasePresent &&
                                this.state.isLowercasePresent &&
                                this.state.isNumberPresent &&
                                this.state.isSpecialCharacterPresent &&
                                this.state.isLengthValid,
                        },
                        () => {
                            this.props.handleInput(
                                this.state.password,
                                this.state.isPasswordValid
                            );
                        }
                    );
                }
            );
        });
    };

    render() {
        return (
            <div className="mb-5">
                <div className="flex justify-start gap-2 mb-2 items-center">
                    <label
                        htmlFor="password"
                        className="text-black dark:text-white text-md font-bold"
                    >
                        Password
                    </label>
                    <QuestionMarkCircleIcon
                        className="w-5 text-white_text dark:text-dark_text"
                        onMouseEnter={() => this.setState({ showHelp: true })}
                        onMouseLeave={() => this.setState({ showHelp: false })}
                    />
                    {this.state.showHelp ? (
                        <div className="absolute top-64 bg-dark_bg text-dark_text z-10 rounded p-5 drop-shadow-lg m-2">
                            <h1 className="font-bold text-lg">
                                Password Requirements
                            </h1>
                            <ul className="">
                                <li>Length between [8;30]</li>
                                <li>At least one uppercase character</li>
                                <li>At least one lowercase character</li>
                                <li>At least one number</li>
                                <li>At least one allowed special character</li>
                            </ul>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="z-0 flex justify-self-center align-middle w-full p-2 bg-white dark:bg-dark_input rounded drop-shadow mb-1">
                    <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInput}
                        onFocus={() => this.setState({ isFocused: true })}
                        onBlur={() => this.setState({ isFocused: false })}
                        className="h-8 p-2 text-lg focus:outline-none w-full bg-transparent text-white_text dark:text-white"
                    />
                    {this.state.isFocused ? (
                        this.state.isPasswordValid ? (
                            <CheckIcon className="h-8 text-primary_green" />
                        ) : (
                            <XIcon className="w-8 text-primary" />
                        )
                    ) : (
                        ""
                    )}
                </div>
                <Line
                    percent={(this.state.password.length / 30) * 100}
                    strokeWidth={1}
                    strokeColor={
                        this.state.isPasswordValid ? "#72E885" : "#E67082"
                    }
                />
            </div>
        );
    }
}

export default PasswordInput;
