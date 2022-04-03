import { ChangeEvent, Component, ReactNode } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";

interface UserInputProps {
    handleInput;
}

interface UserInputState {
    username: string;
    isValid: boolean;
}

class UserInput extends Component<UserInputProps, UserInputState> {
    constructor(props: UserInputProps) {
        super(props);
        this.state = {
            username: "",
            isValid: false,
        };
    }

    handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: e.target.value }, () => {
            if (this.state.username.length > 3) {
                /*fetch(
                    backendURL +
                        "/register/validateUsername/" +
                        this.state.username,
                    {
                        method: "GET",
                    }
                ).then((response) => {
                    
                });*/
            }
        });
    };

    callBackend;

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
                            ? "bg-transparent border border-primary_green w-full p-2 rounded focus:outline-none focus:primary_green transition-all duration-500 text-black dark:text-white"
                            : "bg-transparent border border-border_primary w-full p-2 rounded focus:outline-none focus:border-primary transition-all duration-500 text-black dark:text-white peer"
                    }
                />
                <div className="opacity-0 h-0 peer-focus:opacity-100 peer-focus:h-full transition-all duration-300">
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

export default UserInput;
