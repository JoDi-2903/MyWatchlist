import React, { Component } from "react";

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
                            ? "bg-transparent border border-primary_green w-full p-2 rounded focus:outline-none focus:border-primary_green transition-all duration-500 text-black dark:text-white peer mb-1"
                            : "bg-transparent border border-border_primary w-full p-2 rounded focus:outline-none focus:border-primary transition-all duration-500 text-black dark:text-white peer mb-1"
                    }
                    value={this.state.mail}
                    onChange={this.handleInput}
                />
                <div className="opacity-0 h-0 peer-focus:opacity-100 peer-focus:h-full transition-all duration-300">
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
