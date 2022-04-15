import { Component } from "react";
import { UserIcon } from "@heroicons/react/solid";

interface UserProfileProps {
    username: string;
}

class UserProfile extends Component<UserProfileProps> {
    render() {
        return (
            <div className="w-full">
                <div className="flex gap-5 justify-center p-5 mx-auto border-b border-black dark:border-white">
                    <UserIcon className="w-10 text-dark dark:text-white" />
                    <h1 className="text-3xl text-dark dark:text-white">
                        {this.props.username}
                    </h1>
                </div>
                <div className="w-3/4 mx-auto">
                    <h2 className="text-3xl text-primary pt-5 mt-10 mb-5 border-b border-primary">
                        Watchlist
                    </h2>
                    <p className="dark:text-white">
                        This information is private. Please ask the user to change his/her setting.
                    </p>
                </div>
            </div>
        );
    }
}

export default UserProfile;
