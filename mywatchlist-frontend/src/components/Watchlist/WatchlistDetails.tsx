import { ExternalLinkIcon } from "@heroicons/react/solid";
import { Component } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { backendURL } from "../../Config";
import { isLoggedIn, JWTInfo } from "../../security/JWTContext";
import ListElement from "../List/ListElement";

interface WatchlistDetailsProps {
    id: number;
    jwtInfo: JWTInfo;
}

interface WatchlistDetailsState {
    watchlist;
}

class WatchlistDetails extends Component<
    WatchlistDetailsProps,
    WatchlistDetailsState
> {
    constructor(props: WatchlistDetailsProps) {
        super(props);
        this.state = {
            watchlist: {
                watchlistName: "",
                watchlistEntries: [],
            },
        };

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        var responseStatus = 0;
        var responseData;
        await fetch(
            backendURL +
                "/watchlist/get-watchlist/" +
                this.props.jwtInfo.username +
                "/" +
                this.props.id,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + this.props.jwtInfo.jwt,
                },
            }
        )
            .then((response) => {
                responseStatus = response.status;
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((data) => {
                responseData = data;
            });
        if (responseStatus === 200) {
            this.setState(
                {
                    watchlist: responseData,
                },
                () => console.log(this.state)
            );
        } else {
            toast.error("Could not load the watchlist.");
        }
    };

    render() {
        return (
            <div>
                {isLoggedIn(this.props.jwtInfo.jwt) ? (
                    ""
                ) : (
                    <Navigate to="/login" />
                )}
                <h1 className="text-primary font-bold text-4xl mb-4 text-center">
                    {this.state.watchlist.watchlistName}
                </h1>
                {this.state.watchlist.watchlistEntries.length === 0 ? (
                    <div>
                        <p className="text-white_text dark:text-dark_text text-lg text-center">
                            There are no entries in this list.
                        </p>
                        <Link to="/search">
                            <span className="flex justify-between gap-1 text-white_text dark:text-dark_text text-center text-lg underline hover:dark:text-primary">
                                Go to the search to find movies or TV shows
                                <ExternalLinkIcon className="w-4" />
                            </span>
                        </Link>
                    </div>
                ) : (
                    ""
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {this.state.watchlist.watchlistEntries.map((entry) => (
                        <ListElement
                            id={entry.titleId}
                            key={entry.titleId}
                            showAddToList={false}
                            showDeleteFromList={true}
                            type={entry.titleType}
                            watchlistId={this.props.id}
                            triggerUpdate={() =>
                                setTimeout(() => {
                                    this.loadData();
                                }, 200)
                            }
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default WatchlistDetails;
