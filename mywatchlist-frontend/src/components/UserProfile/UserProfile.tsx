import { Component } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { backendURL } from "../../Config";
import { JWTInfo } from "../../security/JWTContext";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import ListOverview from "../List/ListOverview";
import Card from "../Wrapper/Card";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";

interface UserProfileProps {
    username: string;
    jwtInfo: JWTInfo;
}

interface UserProfileState {
    existUser: boolean;
    username: string;
    email: string;
    isPrivateProfile: boolean;
    watchlist;
}

class UserProfile extends Component<UserProfileProps, UserProfileState> {
    numberEntries: number = 0;

    constructor(props: UserProfileProps) {
        super(props);
        this.state = {
            existUser: true,
            username: props.username,
            email: "",
            isPrivateProfile: true,
            watchlist: [],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        if (this.props.username === this.props.jwtInfo.username) {
            await fetch(backendURL + "/user/myprofile/" + this.props.username, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + this.props.jwtInfo.jwt,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.setState(
                        {
                            email: data.email,
                            isPrivateProfile: data.privateProfile,
                            watchlist: data.watchlistList,
                        },
                        () => {
                            this.numberEntries = 0;
                            this.state.watchlist.forEach((element) => {
                                this.numberEntries +=
                                    element.watchlistEntries.length;
                            });
                        }
                    );
                });
        } else {
            var exists: boolean = true;
            await fetch(backendURL + "/user/profile/" + this.props.username, {
                method: "GET",
            })
                .then((response) => {
                    if (response.status !== 200) {
                        exists = false;
                    }
                    return response.json();
                })
                .then((data) => {
                    if (exists) {
                        console.log(data);
                        if (data.isPrivateProfile) {
                            this.setState({
                                existUser: true,
                                email: "",
                                isPrivateProfile: data.isPrivateProfile,
                                watchlist: [],
                            });
                        } else {
                            this.setState(
                                {
                                    existUser: true,
                                    email: "",
                                    isPrivateProfile: data.isPrivateProfile,
                                    watchlist: data.watchlistList,
                                },
                                () => {
                                    this.numberEntries = 0;
                                    this.state.watchlist.forEach((element) => {
                                        this.numberEntries +=
                                            element.watchlistEntries.length;
                                    });
                                }
                            );
                        }
                    } else {
                        toast.error(data.response);
                        this.setState({
                            username: "User does not exist!",
                            existUser: false,
                            email: "",
                            isPrivateProfile: false,
                            watchlist: [],
                        });
                    }
                });
        }
    }

    render() {
        return (
            <div className="w-full">
                {this.state.existUser ? (
                    <div>
                        <div className="bg-gray-50 dark:bg-dark_navbar drop-shadow-lg p-6 flex">
                            <img
                                src={createAvatar(style, {
                                    seed: this.props.username,
                                    dataUri: true,
                                })}
                                className="w-20 h-20 rounded bg-white_bg dark:bg-dark_bg m-4"
                            />
                            <div className="m-4">
                                <h1 className="text-4xl text-white_text dark:text-dark_text font-bold">
                                    {this.props.username}
                                </h1>
                                <div className="flex gap-2">
                                    <div
                                        className={
                                            "px-2 bg-white_bg dark:bg-dark_bg text-white_text dark:text-dark_text w-fit rounded-full " +
                                            (this.state.isPrivateProfile
                                                ? "blur-sm"
                                                : "")
                                        }
                                    >
                                        {this.state.isPrivateProfile
                                            ? "-- -----"
                                            : this.state.watchlist.length +
                                              " Lists"}
                                    </div>
                                    <div
                                        className={
                                            "px-2 bg-white_bg dark:bg-dark_bg text-white_text dark:text-dark_text w-fit rounded-full " +
                                            (this.state.isPrivateProfile
                                                ? "blur-sm"
                                                : "")
                                        }
                                    >
                                        {this.state.isPrivateProfile
                                            ? "-- -------"
                                            : this.numberEntries + " Entries"}
                                    </div>
                                </div>
                                {!this.state.isPrivateProfile ? (
                                    <p className="text-white_text dark:text-dark_text">
                                        {this.state.email}
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        {!this.state.isPrivateProfile ? (
                            <ListOverview
                                lists={this.state.watchlist}
                                deleteWatchlists={false}
                            />
                        ) : (
                            <p className="dark:text-white text-center">
                                This profile is private.
                            </p>
                        )}
                    </div>
                ) : (
                    <Navigate to="/" />
                )}
            </div>
        );
    }
}

export default UserProfile;
