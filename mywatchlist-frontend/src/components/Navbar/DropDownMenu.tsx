import { Component } from "react";
import {
    UserIcon,
    LogoutIcon,
    AdjustmentsIcon,
    CollectionIcon,
    SearchIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";

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
        this.setState({ isVisible: !this.state.isVisible });
    };

    render() {
        return (
            <div>
                <button
                    onClick={this.btnChangeHandler}
                    // className="p-2 text-white border border-primary rounded shadow hover:bg-primary dark:hover:text-dark_navbar flex justify-between gap-2 w-40"
                    className=" text-white rounded shadow bg-dark_input w-48 flex justify-between gap-2 items-center pl-2"
                >
                    <p>{localStorage.getItem("username") as string}</p>
                    <Hamburger
                        toggled={this.state.isVisible}
                        size={20}
                        duration={0.1}
                        label="Show menu"
                    />
                </button>
                {this.state.isVisible ? (
                    <ul className="absolute text-white rounded z-40 bg-dark_input w-48 drop-shadow-2xl gap-2">
                        <li className="py-3 pl-2 pr-3 hover:bg-primary dark:hover:text-dark_navbar cursor-pointer">
                            <Link
                                to={
                                    ("/user/" +
                                        localStorage.getItem(
                                            "username"
                                        )) as string
                                }
                                className="flex justify-between gap-2"
                            >
                                <p>Public Profile</p>
                                <UserIcon className="w-6" />
                            </Link>
                        </li>
                        <li className="py-3 pl-2 pr-3 hover:bg-primary dark:hover:text-dark_navbar cursor-pointer">
                            <Link
                                to="/settings"
                                className="flex justify-between gap-2"
                            >
                                <p>Settings</p>
                                <AdjustmentsIcon className="w-6" />
                            </Link>
                        </li>
                        <li className="py-3 pl-2 pr-3 hover:bg-primary dark:hover:text-dark_navbar cursor-pointer">
                            <Link
                                to="/mywatchlist"
                                className="flex justify-between gap-2"
                            >
                                <p>Watchlists</p>
                                <CollectionIcon className="w-6" />
                            </Link>
                        </li>
                        <li className="py-3 pl-2 pr-3 hover:bg-primary dark:hover:text-dark_navbar cursor-pointer">
                            <Link
                                to="/search"
                                className="flex justify-between gap-2"
                            >
                                <p>Search</p>
                                <SearchIcon className="w-6" />
                            </Link>
                        </li>
                        <li className="py-3 pl-2 pr-3 hover:bg-primary dark:hover:text-dark_navbar cursor-pointer">
                            <Link
                                to="/logout"
                                className="flex justify-between gap-2"
                            >
                                <p>Logout</p>
                                <LogoutIcon className="w-6" />
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
