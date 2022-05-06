import { ChangeEvent, Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import { classesInvalidInput, classesValidInput } from "../ComponentClasses";

interface UsernameInputProps {
    handleInput;
}

interface UsernameInputState {
    username: string;
    isValid: boolean;
}

class UsernameInput extends Component<UsernameInputProps, UsernameInputState> {
    constructor(props: UsernameInputProps) {
        super(props);
        this.state = {
            username: "",
            isValid: false,
        };
    }

    handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: e.target.value }, async () => {
            if (this.state.username.length > 3) {
                var httpStatus = 0;
                var respone_text;
                await fetch(
                    backendURL +
                        "/register/validateUsername/" +
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
                <input
                    id="username"
                    type="text"
                    onChange={this.handleInput}
                    className={
                        this.state.isValid
                            ? classesValidInput
                            : classesInvalidInput + " peer"
                    }
                />
                <div className="invisible h-0 peer-focus:visible peer-focus:h-full transition-all duration-300">
                    <p
                        className={
                            this.state.isValid ? "hidden" : "text-primary"
                        }
                    >
                        Username is already taken or invalid
                    </p>
                </div>
            </div>
        );
    }
}

export default UsernameInput;
