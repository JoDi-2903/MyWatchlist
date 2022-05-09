import { Component } from "react";
import { Navigate } from "react-router-dom";
import AddList from "../../components/List/AddList";
import MyWatchlist from "../../components/List/MyWatchlist";
import { isLoggedIn, JWTContext } from "../../security/JWTContext";

class MyWatchlistPage extends Component {
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
                                <MyWatchlist jwtInfo={jwtInfo} />
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

export default MyWatchlistPage;
