import { MailIcon, PencilIcon } from "@heroicons/react/solid";
import { Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import { getUsername, JWTInfo } from "../../security/JWTContext";
import MailInput from "../Registration/MailInput";

interface ChangeEmailProps {
    jwtInfo: JWTInfo;
    email: string;
}

interface ChangeEmailState {
    email: string;
    editEmail: boolean;
    newEmail;
}

class ChangeEmail extends Component<ChangeEmailProps, ChangeEmailState> {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            editEmail: false,
            newEmail: {
                email: "",
                isValid: false,
            },
        };
        this.saveMail = this.saveMail.bind(this);
    }

    componentDidUpdate() {
        if (this.state.email !== this.props.email)
            this.setState({ email: this.props.email });
    }

    async saveMail() {
        if (this.state.newEmail.isValid) {
            var responseStatus = 0;
            var responseText = "";
            await fetch(backendURL + "/user/changeEmail", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.props.jwtInfo.jwt,
                },
                body: JSON.stringify({
                    username: getUsername(),
                    email: this.state.newEmail.email,
                }),
            })
                .then((response) => {
                    responseStatus = response.status;
                    return response.json();
                })
                .then((data) => (responseText = data.response));
            if (responseStatus === 200) {
                toast.success(responseText);
                this.setState({ email: this.state.newEmail.email });
            } else {
                toast.error(responseText);
            }
        } else {
            toast.error("New E-Mail is not valid.");
        }
    }

    render() {
        return (
            <div className="dark:text-white border border-black dark:border-white rounded m-5 p-5">
                <div className="flex justify-between">
                    <div className="flex justify-center gap-5">
                        <MailIcon className="w-10" />
                        <div>
                            <h2 className="text-xl dark:text-white">E-Mail</h2>
                            {this.state.email}
                        </div>
                    </div>
                    <div
                        className="flex justify-between gap-2 rounded border border-black dark:border-white cursor-pointer p-2"
                        onClick={() =>
                            this.setState({
                                editEmail: !this.state.editEmail,
                            })
                        }
                    >
                        <PencilIcon className="w-5" />
                        <p className="pt-1">Edit</p>
                    </div>
                </div>
                <div
                    className={
                        this.state.editEmail
                            ? "w-10/12 mt-5 mx-auto grid grid-cols-1 p-5"
                            : "hidden"
                    }
                >
                    <h1 className="text-lg text-primary font-bold">
                        Change E-Mail
                    </h1>
                    <MailInput
                        title="New E-Mail"
                        handleInput={(email, isValid) =>
                            this.setState({
                                newEmail: {
                                    email: email,
                                    isValid: isValid,
                                },
                            })
                        }
                    />
                    <button
                        onClick={this.saveMail}
                        className="p-2 text-white dark:text-dark_navbar border border-primary hover:border-primary-200 rounded-lg shadow bg-primary hover:bg-primary-200 w-1/8 m-auto disabled:bg-primary-300 disabled:border-primary-300 disabled:dark:text-white w-1/3"
                        disabled={!this.state.newEmail.isValid}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

export default ChangeEmail;
