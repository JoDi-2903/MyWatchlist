import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { ChangeEvent, Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";

interface UsernameInputProps {
    handleInput;
}

interface UsernameInputState {
    username: string;
    isValid: boolean;
    isFocused: boolean;
}

class UsernameInput extends Component<UsernameInputProps, UsernameInputState> {
    constructor(props: UsernameInputProps) {
        super(props);
        this.state = {
            username: "",
            isValid: false,
            isFocused: false,
        };
    }

    handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: e.target.value }, async () => {
            if (this.state.username.length > 3) {
                var httpStatus = 0;
                var respone_text;
                await fetch(
                    backendURL +
                        "/register/validate-username/" +
                        this.state.username,
                    {
                        method: "GET",
                    }
                )
                    .then((response) => {
                        httpStatus = response.status;
                        return response.json();
                    })
                    .then((data) => {
                        respone_text = data.response;
                    });
                if (httpStatus === 200) {
                    this.setState({ isValid: true }, () => {
                        this.props.handleInput(
                            this.state.username,
                            this.state.isValid
                        );
                    });
                } else {
                    toast.error(respone_text);
                    this.setState({ isValid: false }, () => {
                        this.props.handleInput(
                            this.state.username,
                            this.state.isValid
                        );
                    });
                }
            } else {
                this.setState({ isValid: false }, () => {
                    this.props.handleInput(
                        this.state.username,
                        this.state.isValid
                    );
                });
            }
        });
    };

    render() {
        return (
            <div className="mb-5">
                <label
                    htmlFor="username"
                    className="block text-black dark:text-white text-md font-bold mb-2"
                >
                    Username
                </label>
                <div className="z-0 flex justify-self-center align-middle w-full p-2 bg-white dark:bg-dark_input rounded drop-shadow">
                    <input
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleInput}
                        onFocus={() => this.setState({ isFocused: true })}
                        onBlur={() => this.setState({ isFocused: false })}
                        className="h-8 p-2 text-lg focus:outline-none w-full bg-transparent text-white_text dark:text-white"
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

export default UsernameInput;
