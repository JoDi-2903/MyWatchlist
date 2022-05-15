import { Component } from "react";
import { Navigate } from "react-router-dom";
import WatchlistOverview from "../../components/WatchlistOverview/WatchlistOverview";
import { isLoggedIn, JWTContext } from "../../security/JWTContext";

export default class WatchlistOverviewPage extends Component {
    render() {
        return (
            <JWTContext.Consumer>
                {({ jwtInfo, changeJWT }) => (
                    <main className="w-full md:w-3/4 mx-auto my-10 p-5 flex justify-center">
                        {isLoggedIn(jwtInfo.jwt) ? (
                            <div className="w-full">
                                <h1 className="text-white_text dark:text-white text-4xl text-center font-bold">
                                    Your lists
                                </h1>
                                <WatchlistOverview jwtInfo={jwtInfo} />
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
