import { Component, ReactNode } from "react";
import { backendURL } from "../../Config";
import { JWTInfo } from "../../security/JWTContext";
import AddList from "./AddList";
import ListOverview from "../List/ListOverview";

interface WatchlistOverviewProps {
    jwtInfo: JWTInfo;
}

interface WatchlistOverviewState {
    list;
}

export default class WatchlistOverview extends Component<
    WatchlistOverviewProps,
    WatchlistOverviewState
> {
    constructor(props: WatchlistOverviewProps) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        await fetch(
            backendURL + "/user/myprofile/" + this.props.jwtInfo.username,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + this.props.jwtInfo.jwt,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    list: data.watchlistList,
                });
            });
    }

    render(): ReactNode {
        return (
            <div>
                <AddList
                    jwtInfo={this.props.jwtInfo}
                    onAdded={() => this.loadData()}
                />
                <ListOverview
                    lists={this.state.list}
                    deleteWatchlists={true}
                    jwtInfo={this.props.jwtInfo}
                    linkToWatchlist={true}
                    onDelete={() => {
                        this.loadData();
                    }}
                />
            </div>
        );
    }
}
