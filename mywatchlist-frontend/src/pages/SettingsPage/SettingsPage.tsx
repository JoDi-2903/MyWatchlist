import { Component } from "react";
import { Navigate } from "react-router";
import SettingData from "../../components/Settings/SettingData";
import { JWTContext, isLoggedIn } from "../../security/JWTContext";

class SettingsPage extends Component {
    render() {
        return (
            <JWTContext.Consumer>
                {({ jwtInfo, changeJWT }) => (
                    <main className="w-full md:w-3/4 mx-auto my-10 p-5 flex justify-center">
                        {isLoggedIn(jwtInfo.jwt) ? (
                            <div className="w-full">
                                <h1 className="text-white_text dark:text-white text-4xl text-center font-bold">
                                    Settings
                                </h1>

                                <SettingData jwtInfo={jwtInfo} />
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
