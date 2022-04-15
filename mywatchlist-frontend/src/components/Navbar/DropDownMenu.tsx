import { Component, ReactEventHandler } from "react";
import {
    ChevronDownIcon,
    UserIcon,
    LogoutIcon,
    AdjustmentsIcon,
    CollectionIcon
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

interface DropDownMenuProps {}
interface DropDownMenuState {
    isVisible: boolean;
}

class DropDownMenu extends Component<DropDownMenuProps, DropDownMenuState> {
    constructor(props: DropDownMenuProps) {
        super(props);
        this.state = {
            isVisible: false,
        };
    }

    btnChangeHandler = () => {
        let state: boolean = this.state.isVisible;
        this.setState({ isVisible: !state });
    };

    render() {
        return (
            <div>
                <button
                    onClick={this.btnChangeHandler}
                    className="p-2 text-white border border-primary rounded shadow hover:bg-primary dark:hover:text-dark_navbar flex justify-between gap-2 w-40"
                >
                    {localStorage.getItem("username") as string}
                    <ChevronDownIcon className="w-5" />
                </button>
                {this.state.isVisible ? (
                    <ul className="absolute text-white justify-center rounded z-40 bg-dark_navbar w-40">
                        <li className="p-2 w-30 hover:bg-primary dark:hover:text-dark_navbar cursor-pointer">
                            <Link
                                to={"/user/" + localStorage.getItem("username") as string}
                                className="flex justify-between gap-2"
                            >
                                <p>My Profile</p>
                                <UserIcon className="w-5" />
                            </Link>
                        </li>
                        <li className="p-2 w-30 hover:bg-primary dark:hover:text-dark_navbar cursor-pointer">
                            <Link
                                to="/settings"
                                className="flex justify-between gap-2"
                            >
                                <p>Settings</p>
                                <AdjustmentsIcon className="w-5" />
                            </Link>
                        </li>
                        <li className="p-2 w-30 hover:bg-primary dark:hover:text-dark_navbar cursor-pointer">
                            <Link
                                to="/mywatchlist"
                                className="flex justify-between gap-2"
                            >
                                <p>My Watchlist</p>
                                <CollectionIcon className="w-5" />
                            </Link>
                        </li>
                        <li className="p-2 w-30 hover:bg-primary dark:hover:text-dark_navbar cursor-pointer">
                            <Link
                                to="/logout"
                                className="flex justify-between gap-2"
                            >
                                <p>Logout</p>
                                <LogoutIcon className="w-5" />
                            </Link>
                        </li>
                    </ul>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default DropDownMenu;
