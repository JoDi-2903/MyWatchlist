import { Component } from "react";
import { Navigate } from "react-router";
import Login from "../../components/Login/Login";
import { isLoggedIn, JWTContext } from "../../security/JWTContext";

export default class LoginPage extends Component {

    render() {
        return (
            <JWTContext.Consumer>
                {({jwtInfo, changeJWT}) => (
                    <main className="p-10">
                        {isLoggedIn(jwtInfo.jwt) ? (
                            <Navigate to="/" />
                        ) : (
                            <div>
                                <h1 className="text-center text-black dark:text-white text-4xl m-5 font-bold">
                                    Sign in into{" "}
                                    <span className="text-primary">
                                        MyWatchlist
                                    </span>
                                </h1>
                                <Login
                                    isLoggedIn={isLoggedIn(
                                        jwtInfo.jwt
                                    )}
                                    changeJWT={changeJWT}
                                />
                                <p className="text-center text-gray-500 dark:text-gray-300 text-xs m-2">
                                    &copy; 2022 MyWatchlist
                                </p>
                            </div>
                        )}
                    </main>
                )}
            </JWTContext.Consumer>
        );
    }
}
