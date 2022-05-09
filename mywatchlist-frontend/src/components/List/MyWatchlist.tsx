import { Component, ReactNode } from "react";
import { backendURL } from "../../Config";
import { JWTInfo } from "../../security/JWTContext";
import AddList from "./AddList";
import ListOverview from "./ListOverview";

interface MyWatchlistProps {
    jwtInfo: JWTInfo;
}

interface MyWatchlistState {
    list;
}

class MyWatchlist extends Component<MyWatchlistProps, MyWatchlistState> {
    constructor(props: MyWatchlistProps) {
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
                    onDelete={() => {
                        this.loadData();
                    }}
                />
            </div>
        );
    }
}

export default MyWatchlist;
