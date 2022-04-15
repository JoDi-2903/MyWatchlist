import { Component } from "react";
import { Navigate } from "react-router";
import { JWTContext, isLoggedIn } from "../../security/JWTContext";

class SettingsPage extends Component {
    render() {
        return (
            <JWTContext.Consumer>
                {({ jwtInfo, changeJWT }) => (
                    <main className="w-3/4 mx-auto my-10 p-10 flex justify-center">
                        {isLoggedIn(jwtInfo.jwt) ? (
                            <div className="w-full">
                                <div className="p-5 border-b w-full">
                                    <h1 className="dark:text-white text-3xl text-center">
                                        Settings
                                    </h1>
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )}
                    </main>
                )}
            </JWTContext.Consumer>
        );
    }
}

export default SettingsPage;