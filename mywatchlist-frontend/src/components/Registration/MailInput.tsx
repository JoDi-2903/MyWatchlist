import React, { Component } from "react";
import { classesInvalidInput, classesValidInput } from "../ComponentClasses";

interface MailInputProps {
    handleInput;
}

interface MailInputState {
    mail: string;
    isValid: boolean;
}

class MailInput extends Component<MailInputProps, MailInputState> {
    constructor(props: MailInputProps) {
        super(props);
        this.state = {
            mail: "",
            isValid: false,
        };
    }

    handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ mail: e.target.value }, () => {
            // Check Mail here
            var match = (
                this.state.mail.match(
                    "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
                ) || []
            ).length;

            this.setState(
                {
                    isValid: match != 0,
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
                    E-Mail
                </label>
                <input
                    id="email"
                    className={
                        this.state.isValid
                            ? classesValidInput + " peer mb-1"
                            : classesInvalidInput + " peer mb-1"
                    }
                    value={this.state.mail}
                    onChange={this.handleInput}
                />
                <div className="opacity-0 h-0 peer-focus:opacity-100 peer-focus:h-full transition-all duration-100">
                    <p
                        className={
                            this.state.isValid ? "hidden" : "text-primary"
                        }
                    >
                        Please provide a valid E-Mail.
                    </p>
                </div>
            </div>
        );
    }
}
export default MailInput;
