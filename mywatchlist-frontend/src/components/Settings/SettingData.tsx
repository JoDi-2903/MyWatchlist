import {
    UserIcon,
    MailIcon,
    ShieldCheckIcon,
    PencilIcon,
} from "@heroicons/react/solid";
import { Component } from "react";
import { backendURL } from "../../Config";
import { JWTInfo } from "../../security/JWTContext";

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

    render() {
        return (
            <div className="grid-rows-1 justify-center">
                <div className="dark:text-white border border-black dark:border-white rounded m-5 p-5 flex justify-between">
                    <div className="flex justify-center gap-5">
                        <UserIcon className="w-10" />
                        <div>
                            <h2 className="text-xl dark:text-white">
                                Username
                            </h2>
                            {this.state.username}
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 rounded border border-black dark:border-white cursor-pointer p-2">
                        <PencilIcon className="w-5" />
                        <p className="pt-1">Edit</p>
                    </div>
                </div>

                <div className="dark:text-white border border-black dark:border-white rounded m-5 p-5 flex justify-between">
                    <div className="flex justify-center gap-5">
                        <MailIcon className="w-10" />
                        <div>
                            <h2 className="text-xl dark:text-white">E-Mail</h2>
                            {this.state.email}
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 rounded border border-black dark:border-white cursor-pointer p-2">
                        <PencilIcon className="w-5" />
                        <p className="pt-1">Edit</p>
                    </div>
                </div>

                <div className="dark:text-white border border-black dark:border-white rounded m-5 p-5 flex justify-between">
                    <div className="flex justify-center gap-5">
                        <ShieldCheckIcon className="w-10" />
                        <div>
                            <h2 className="text-xl dark:text-white">
                                Privacy Settings
                            </h2>
                            <p>
                                {this.state.privateProfile
                                    ? "Profile is public"
                                    : "Profile is private"}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between gap-2 rounded border border-black dark:border-white cursor-pointer p-2">
                        <PencilIcon className="w-5" />
                        <p className="pt-1">Edit</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="p-2 text-white dark:text-dark_navbar border border-primary hover:border-primary-200 rounded-lg shadow bg-primary hover:bg-primary-200">
                        Delete Account
                    </button>
                </div>
            </div>
        );
    }
}

export default SettingData;
