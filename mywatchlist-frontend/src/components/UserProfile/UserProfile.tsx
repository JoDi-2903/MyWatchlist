import { Component } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { backendURL } from "../../Config";
import { JWTInfo } from "../../security/JWTContext";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

interface UserProfileProps {
    username: string;
    jwtInfo: JWTInfo;
}

interface UserProfileState {
    existUser: boolean;
    username: string;
    email: string;
    privateProfile: boolean;
    watchlist;
}

class UserProfile extends Component<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props);
        this.state = {
            existUser: true,
            username: props.username,
            email: "",
            privateProfile: true,
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
                    this.setState({
                        email: data.email,
                        privateProfile: data.privateProfile,
                        watchlist: data.watchlistList,
                    });
                });
        } else {
            var exists: boolean = true;
            await fetch(backendURL + "/user/profile/" + this.props.username, {
                method: "GET",
            })
                .then((response) => {
                    if (response.status !== 201) {
                        exists = false;
                    }
                    return response.json();
                })
                .then((data) => {
                    if (exists) {
                        if (data.privateProfile) {
                            this.setState({
                                existUser: true,
                                email: "",
                                privateProfile: data.privateProfile,
                                watchlist: [],
                            });
                        }else{
                            this.setState({
                                existUser: true,
                                email: "",
                                privateProfile: data.privateProfile,
                                watchlist: data.watchlist,
                            });
                        }
                        
                    } else {
                        toast.error(data.response)
                        this.setState({
                            username: "User does not exist!",
                            existUser: false,
                            email: "",
                            privateProfile: false,
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
                        <div className="flex gap-5 justify-center p-5 mx-auto border-b border-black dark:border-white">
                            <UserIcon className="w-14 text-dark dark:text-white" />
                            <div>
                                <h1 className="text-3xl text-dark dark:text-white">
                                    {this.props.username}
                                </h1>
                                {!this.state.privateProfile ? (
                                    <p className="dark:text-white">
                                        {this.state.email}
                                    </p>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        {!this.state.privateProfile ? (
                            this.state.watchlist.map((list) => (
                                <div
                                    className="w-3/4 mx-auto"
                                    key={list.watchlistName}
                                >
                                    <h2 className="text-3xl text-primary pt-5 mt-10 mb-5 border-b border-primary">
                                        {list.watchlistName}
                                    </h2>
                                </div>
                            ))
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
