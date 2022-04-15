import { Line } from "rc-progress";
import React, { Component } from "react";
import { classesInvalidInput, classesValidInput } from "../ComponentClasses";

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
                        this.state.password.length <= 30,
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
            <div>
                <label
                    htmlFor="password"
                    className="block text-black dark:text-white text-md font-bold mb-2"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInput}
                    className={
                        this.state.isPasswordValid
                            ? classesValidInput + " peer mb-2"
                            : classesInvalidInput + " peer mb-2"
                    }
                />
                <Line
                    percent={(this.state.password.length / 30) * 100}
                    strokeWidth={1}
                    strokeColor={
                        this.state.isPasswordValid ? "#72E885" : "#E67082"
                    }
                />
                <div className="invisible h-0 mb-5 peer-focus:visible peer-focus:h-full transition-all">
                    <div className="grid grid-cols-1">
                        <div
                            className={
                                this.state.isLengthValid
                                    ? "hidden"
                                    : "text-primary"
                            }
                        >
                            Current Length {this.state.password.length} is out
                            of bounds [8; 30].
                        </div>
                        <div
                            className={
                                this.state.isUppercasePresent
                                    ? "hidden"
                                    : "text-primary"
                            }
                        >
                            At least one uppercase character
                        </div>
                        <div
                            className={
                                this.state.isLowercasePresent
                                    ? "hidden"
                                    : "text-primary"
                            }
                        >
                            At least one lowercase character
                        </div>
                        <div
                            className={
                                this.state.isNumberPresent
                                    ? "hidden"
                                    : "text-primary"
                            }
                        >
                            At least one number
                        </div>
                        <div
                            className={
                                this.state.isSpecialCharacterPresent
                                    ? "hidden"
                                    : "text-primary"
                            }
                        >
                            At least one allowed special character
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PasswordInput;
