import { Component } from "react";
import { Navigate } from "react-router";
import {
    clearJWT,
    clearUsername,
    getJWT,
    JWTContext,
} from "../../security/JWTContext";

class LogoutPage extends Component {
    resetJWT: Function = () => {};

    logout = () => {
        if (getJWT() !== "") {
            clearUsername();
            clearJWT();
        }
        return <Navigate to="/" />;
    };

    componentDidMount() {
        this.resetJWT("");
    }

    render() {
        return (
            <JWTContext.Consumer>
                {({ jwtInfo, changeJWT }) => {
                    this.resetJWT = changeJWT;
                    return this.logout();
                }}
            </JWTContext.Consumer>
        );
    }
}

export default LogoutPage;
