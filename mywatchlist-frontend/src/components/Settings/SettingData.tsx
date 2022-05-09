import {
    UserIcon,
    ShieldCheckIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/solid";
import { Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import { getUsername, JWTInfo } from "../../security/JWTContext";
import Card from "../Wrapper/Card";
import ChangeEmail from "./ChangeMail";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

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
            this.setState({ privateProfile: !this.state.privateProfile });
        } else {
            toast.error(responseText);
        }
    }

    render() {
        return (
            <div className="grid-rows-1 justify-center w-full xs:w-3/4 xl:w-1/2 m-auto h-auto text-white_text dark:text-dark_text">
                <Card classes="dark:dark_text p-6">
                    <div className="flex justify-between">
                        <div className="flex justify-center gap-5">
                            <UserIcon className="w-10" />
                            <div>
                                <h2 className="text-xl">Username</h2>
                                {this.state.username}
                            </div>
                        </div>
                    </div>
                </Card>

                <ChangeEmail
                    jwtInfo={this.props.jwtInfo}
                    email={this.state.email}
                    onMailChange={(email) => this.setState({ email: email })}
                />

                <ChangePassword jwtInfo={this.props.jwtInfo} />

                <Card classes="dark:dark_text flex justify-between p-6">
                    <div className="flex justify-center gap-5">
                        <ShieldCheckIcon className="w-10" />
                        <div>
                            <h2 className="text-xl">Privacy Settings</h2>
                            <p>
                                {!this.state.privateProfile
                                    ? "Profile is public"
                                    : "Profile is private"}
                            </p>
                        </div>
                    </div>
                    <div className="flex relative">
                        <input
                            type="checkbox"
                            name="toggle"
                            className="absolute left-[3px] top-1 w-6 h-6 rounded-full align-middle appearance-none cursor-pointer checked:bg-primary_green checked:translate-x-8 bg-primary transition-transform ease-in-out duration-300 translate-x-0.5"
                            checked={this.state.privateProfile}
                            onChange={this.togglePrivacy}
                        />
                        <label
                            htmlFor="toggle"
                            className="flex w-16 h-8 p-2 align-middle rounded-full border-2 border-white_text dark:border-dark_text cursor-pointer"
                        ></label>
                    </div>
                </Card>

                <DeleteAccount jwtInfo={this.props.jwtInfo} />
            </div>
        );
    }
}

export default SettingData;
