import { Component } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn, JWTContext } from "../../security/JWTContext";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import DropDownMenu from "./DropDownMenu";

class Navbar extends Component {
    render() {
        return (
            <nav className="bg-white_navbar dark:bg-dark_navbar py-5 px-5 lg:px-20 grid grid-cols-1 md:grid-cols-3 w-full justify-between align-middle">
                <Link
                    to="/"
                    className="flex items-center gap-3 justify-self-center lg:justify-self-start m-2"
                >
                    <img alt="Logo" src="Logo.svg" className="h-10" />
                    <span className="text-3xl text-white">MyWatchlist</span>
                </Link>

                <div />

                <JWTContext.Consumer>
                    {({ jwtInfo, changeJWT }) => (
                        <div className="justify-self-center lg:justify-self-end m-2 flex items-center gap-5">
                            <ThemeSwitch />
                            {isLoggedIn(jwtInfo.jwt) ? (
                                <DropDownMenu />
                            ) : (
                                <div>
                                    <Link
                                        to="/login"
                                        className="py-1 px-3 hover:text-primary text-white dark:hover:text-primary"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="p-2 text-white border border-primary rounded-lg shadow hover:bg-primary dark:hover:text-dark_navbar"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </JWTContext.Consumer>
            </nav>
        );
    }
}

export default Navbar;
