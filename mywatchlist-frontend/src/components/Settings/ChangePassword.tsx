import { MailIcon, PencilIcon } from "@heroicons/react/solid";
import { Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import { getUsername, JWTInfo } from "../../security/JWTContext";
import PasswordInput from "../Registration/PasswordInput";
import Card from "../Wrapper/Card";

interface ChangePasswordProps {
    jwtInfo: JWTInfo;
}

interface ChangePasswordState {
    editPassword: boolean;
    newPassword;
    oldPassword: string;
}

class ChangePassword extends Component<
    ChangePasswordProps,
    ChangePasswordState
> {
    constructor(props: ChangePasswordProps) {
        super(props);
        this.state = {
            editPassword: false,
            newPassword: {
                password: "",
                isValid: false,
            },
            oldPassword: "",
        };
        this.savePassword = this.savePassword.bind(this);
    }

    async savePassword() {
        if (this.state.newPassword.isValid) {
            var responseStatus = 0;
            var responseText = "";
            await fetch(backendURL + "/user/changePassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.props.jwtInfo.jwt,
                },
                body: JSON.stringify({
                    username: getUsername(),
                    newPassword: this.state.newPassword.password,
                    oldPassword: this.state.oldPassword,
                }),
            })
                .then((response) => {
                    responseStatus = response.status;
                    return response.json();
                })
                .then((data) => (responseText = data.response));
            if (responseStatus === 200) {
                toast.success(responseText);
            } else {
                toast.error(responseText);
            }
        } else {
            toast.error("New Password is not valid");
        }
    }

    render() {
        return (
            <Card classes="dark:text-white p-6">
                <div className="flex justify-between">
                    <div className="flex justify-center gap-5">
                        <MailIcon className="w-10" />
                        <div>
                            <h2 className="text-xl ">Password</h2>
                            *************
                        </div>
                    </div>
                    <div
                        className="flex justify-between gap-2 rounded-md border-2 bg-white_bg dark:bg-dark_bg border-white_bg dark:border-dark_bg cursor-pointer p-2 drop-shadow dark:text-dark_text"
                        onClick={() =>
                            this.setState({
                                editPassword: !this.state.editPassword,
                            })
                        }
                    >
                        <PencilIcon className="w-5" />
                        <p className="pt-1">Edit</p>
                    </div>
                </div>
                <div
                    className={
                        this.state.editPassword
                            ? "w-10/12 mt-5 mx-auto grid grid-cols-1 p-5"
                            : "hidden"
                    }
                >
                    <h1 className="text-lg text-primary font-bold">
                        Change Password
                    </h1>
                    <PasswordInput
                        handleInput={(password, isValid) =>
                            this.setState({
                                newPassword: {
                                    password: password,
                                    isValid: isValid,
                                },
                            })
                        }
                    />

                    <label
                        className="block text-md font-bold mb-2"
                        htmlFor="oldPassword"
                    >
                        Old Password
                    </label>
                    <div className="flex justify-self-center align-middle w-full p-2 bg-white dark:bg-dark_input rounded drop-shadow mb-3">
                        <input
                            id="oldPassword"
                            className="h-8 p-2 text-lg focus:outline-none w-full bg-transparent text-white_text dark:text-white"
                            type="password"
                            onChange={(e) =>
                                this.setState({ oldPassword: e.target.value })
                            }
                            value={this.state.oldPassword}
                        />
                    </div>

                    <button
                        onClick={this.savePassword}
                        className="p-2 text-white dark:text-dark_navbar border border-primary hover:border-primary-200 rounded-lg shadow bg-primary hover:bg-primary-200 w-1/8 m-auto disabled:bg-primary-300 disabled:border-primary-300 disabled:dark:text-white w-1/3"
                        disabled={!this.state.newPassword.isValid}
                    >
                        Save
                    </button>
                </div>
            </Card>
        );
    }
}

export default ChangePassword;
