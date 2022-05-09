import { MinusCircleIcon } from "@heroicons/react/solid";
import { Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import { getUsername, JWTInfo } from "../../security/JWTContext";
import Card from "../Wrapper/Card";

interface ListOverviewProps {
    lists;
    deleteWatchlists: boolean;
    jwtInfo: JWTInfo;
    onDelete;
}

interface ListOverviewState {
    lists;
}

class ListOverview extends Component<ListOverviewProps, ListOverviewState> {
    static defaultProps = {
        jwtInfo: {},
        onDelete: () => {},
    };

    constructor(props: ListOverviewProps) {
        super(props);
        this.state = {
            lists: this.props.lists || [],
        };
    }

    componentDidUpdate() {
        if (this.props.lists !== this.state.lists) {
            this.setState({ lists: this.props.lists || [] });
        }
    }

    async deleteList(id: string) {
        var responseStatus: number = 0;
        var responseText: string = "";
        await fetch(
            backendURL +
                "/watchlist/deleteWatchlist/" +
                getUsername() +
                "/" +
                id,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + this.props.jwtInfo.jwt,
                },
            }
        )
            .then((response) => {
                responseStatus = response.status;
                return response.json();
            })
            .then((data) => {
                responseText = data.response;
            });
        if (responseStatus === 200) {
            toast.success(responseText);
        } else {
            toast.error(responseText);
        }
        this.props.onDelete();
    }

    render() {
        return (
            <div>
                {this.state.lists.map((list) => (
                    <Card key={list.watchlistName}>
                        <h2 className="text-3xl text-primary pt-5 mb-5 flex justify-between">
                            {list.watchlistName}
                            {this.props.deleteWatchlists ? (
                                <button
                                    onClick={() =>
                                        this.deleteList(list.watchlistId)
                                    }
                                >
                                    <MinusCircleIcon className="h-6" />
                                </button>
                            ) : (
                                ""
                            )}
                        </h2>
                    </Card>
                ))}
            </div>
        );
    }
}

export default ListOverview;
