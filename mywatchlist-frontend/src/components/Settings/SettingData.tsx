import { UserIcon, ShieldCheckIcon, PencilIcon } from "@heroicons/react/solid";
import { Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import { getUsername, JWTInfo } from "../../security/JWTContext";
import ChangeEmail from "./ChangeMail";
import ChangePassword from "./ChangePassword";

interface SettingDataProps {
    jwtInfo: JWTInfo;
}

interface SettingDataState {
    username: string;
    email: string;
    privateProfile: boolean;
}

class SettingData extends Component<SettingDataProps, SettingDataState> {
    constructor(props: SettingDataProps) {
        super(props);
        this.state = {
            username: "",
            email: "",
            privateProfile: false,
        };

        this.togglePrivacy = this.togglePrivacy.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        await fetch(
            backendURL + "/user/settings/" + this.props.jwtInfo.username,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + this.props.jwtInfo.jwt,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    username: data.username,
                    email: data.email,
                    privateProfile: data.privateProfile,
                });
            });
    }

    async togglePrivacy() {
        var responseStatus = 0;
        var responseText = "";
        await fetch(backendURL + "/user/changePrivateProfile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.props.jwtInfo.jwt,
            },
            body: JSON.stringify({
                username: getUsername(),
                privateProfile: !this.state.privateProfile,
            }),
        })
            .then((response) => {
                responseStatus = response.status;
                return response.json();
            })
            .then((data) => (responseText = data.response));
        if (responseStatus === 200) {
            toast.success(responseText);
            this.setState({privateProfile: !this.state.privateProfile})
        } else {
            toast.error(responseText);
        }
    }

    render() {
        return (
            <div className="grid-rows-1 justify-center w-full xs:w-3/4 xl:w-1/2 m-auto h-auto">
                <div className="dark:text-white border border-black dark:border-white rounded m-5 p-5">
                    <div className="flex justify-between">
                        <div className="flex justify-center gap-5">
                            <UserIcon className="w-10" />
                            <div>
                                <h2 className="text-xl dark:text-white">
                                    Username
                                </h2>
                                {this.state.username}
                            </div>
                        </div>
                    </div>
                </div>

                <ChangeEmail
                    jwtInfo={this.props.jwtInfo}
                    email={this.state.email}
                    onMailChange={(email) => this.setState({email: email})}
                />

                <ChangePassword jwtInfo={this.props.jwtInfo} />

                <div className="dark:text-white border border-black dark:border-white rounded m-5 p-5 flex justify-between">
                    <div className="flex justify-center gap-5">
                        <ShieldCheckIcon className="w-10" />
                        <div>
                            <h2 className="text-xl dark:text-white">
                                Privacy Settings
                            </h2>
                            <p>
                                {!this.state.privateProfile
                                    ? "Profile is public"
                                    : "Profile is private"}
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex justify-between gap-2 rounded border border-black dark:border-white cursor-pointer p-2"
                        onClick={this.togglePrivacy}
                    >
                        <PencilIcon className="w-5" />
                        <p className="pt-1">Switch</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')?.focus()} className="p-2 text-white dark:text-dark_navbar border border-primary hover:border-primary-200 rounded-lg shadow bg-primary hover:bg-primary-200">
                        Delete Account
                    </button>
                </div>
            </div>
        );
    }
}

export default SettingData;
