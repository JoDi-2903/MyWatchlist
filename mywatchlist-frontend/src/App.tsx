import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import HomePage from "./pages/StartPage/StartPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import {
    expiredJWT,
    getJWT,
    isLoggedIn,
    JWTContext,
    JWTInfo,
    updateJWT,
} from "./security/JWTContext";

interface AppProps {}

interface AppState {
    jwtInfo: JWTInfo;
    changeJWT: Function;
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        let jwt = localStorage.getItem("jwt");
        jwt = jwt == null ? "" : jwt;
        let username = localStorage.getItem("username");
        username = username == null ? "" : username;
        this.state = {
            jwtInfo: {
                username: username,
                jwt: jwt,
            },
            changeJWT: (jwt: string) => {
                updateJWT(jwt, (username) => {
                    this.setState({
                        jwtInfo: { username: username, jwt: jwt },
                    });
                    if (username !== "") {
                        toast.success("Welcome " + username);
                    }
                });
            },
        };
        expiredJWT();
    }

    componentDidMount() {
        let jwt = getJWT();
        updateJWT(jwt, (username) => {
            this.setState({
                jwtInfo: { username: username, jwt: jwt },
            });
        });
    }

    render() {
        return (
            <div className="min-h-screen bg-white_bg dark:bg-dark_bg">
                <Router>
                    <JWTContext.Provider
                        value={{
                            jwtInfo: this.state.jwtInfo,
                            changeJWT: this.state.changeJWT,
                        }}
                    >
                        <div>
                            <Toaster position="bottom-right" />
                        </div>
                        <Navbar />
                        <JWTContext.Consumer>
                            {({ jwtInfo, changeJWT }) => (
                                <Routes>
                                    <Route
                                        path="*"
                                        element={<NotFoundPage />}
                                    />
                                    <Route
                                        path="/login"
                                        element={<LoginPage />}
                                    />
                                    <Route
                                        path="/logout"
                                        element={<LogoutPage />}
                                    />
                                    <Route
                                        path="/register"
                                        element={<RegisterPage />}
                                    />
                                    <Route
                                        path="/settings"
                                        element={<SettingsPage />}
                                    />
                                    <Route path="/user/:id" element={<UserProfilePage />}/>

                                    <Route
                                        path="/"
                                        element={
                                            isLoggedIn(jwtInfo.jwt) ? (
                                                <HomePage />
                                            ) : (
                                                <WelcomePage />
                                            )
                                        }
                                    />
                                </Routes>
                            )}
                        </JWTContext.Consumer>
                    </JWTContext.Provider>
                </Router>
            </div>
        );
    }
}
