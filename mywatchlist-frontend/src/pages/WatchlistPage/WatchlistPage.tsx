import { useParams } from "react-router";
import WatchlistDetails from "../../components/Watchlist/WatchlistDetails";
import { JWTContext } from "../../security/JWTContext";

const WatchlistPage = () => {
    const params = useParams();
    return (
        <JWTContext.Consumer>
            {({ jwtInfo, changeJWT }) => (
                <main className="flex justify-center mx-auto my-10 p-10 w-3/4">
                    <WatchlistDetails
                        id={parseInt(params.id as string)}
                        jwtInfo={jwtInfo}
                    />
                </main>
            )}
        </JWTContext.Consumer>
    );
};

export default WatchlistPage;
