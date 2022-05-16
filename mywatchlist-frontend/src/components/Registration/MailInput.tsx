import { CheckIcon, XIcon } from "@heroicons/react/solid";
import React, { Component } from "react";

interface MailInputProps {
    title: string;
    handleInput;
}

interface MailInputState {
    mail: string;
    isValid: boolean;
    isFocused: boolean;
}

class MailInput extends Component<MailInputProps, MailInputState> {
    constructor(props: MailInputProps) {
        super(props);
        this.state = {
            mail: "",
            isValid: false,
            isFocused: false,
        };
    }

    handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ mail: e.target.value }, () => {
            // Check Mail here
            var match = (
                this.state.mail.match(
                    "^[\\w-\\.]+@(([\\w-]+\\.)?)+([\\w-]+\\.)+[\\w-]{2,4}$"
                ) || []
            ).length;

            this.setState(
                {
                    isValid: match !== 0,
                },
                () => {
                    this.props.handleInput(this.state.mail, this.state.isValid);
                }
            );
        });
    };

    render() {
        return (
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="block text-black dark:text-white text-md font-bold mb-2"
                >
                    {this.props.title}
                </label>
                <div className="flex justify-self-center align-middle w-full p-2 bg-white dark:bg-dark_input rounded drop-shadow">
                    <input
                        name="email"
                        className="h-8 p-2 text-lg focus:outline-none w-full bg-transparent text-white_text dark:text-white"
                        value={this.state.mail}
                        onChange={this.handleInput}
                        onFocus={() => this.setState({ isFocused: true })}
                        onBlur={() => this.setState({ isFocused: false })}
                    />
                    {this.state.isFocused ? (
                        this.state.isValid ? (
                            <CheckIcon className="h-8 text-primary_green" />
                        ) : (
                            <XIcon className="w-8 text-primary" />
                        )
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}
export default MailInput;
