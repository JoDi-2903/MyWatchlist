import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { MinusCircleIcon } from "@heroicons/react/solid";
import { Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import { getUsername, JWTInfo } from "../../security/JWTContext";
import Card from "../Wrapper/Card";
import ListElement from "./ListElement";

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
            console.log(this.props.lists);
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
                    <div
                        key={list.watchlistName}
                        className="bg-gray-50 dark:bg-dark_navbar drop-shadow-lg m-4 p-4"
                    >
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
                        <Flicking
                            circular={false}
                            renderOnlyVisible={true}
                            align={"prev"}
                        >
                            {list.watchlistEntries.map((element) => (
                                <div key={element.titleId}>
                                    <ListElement
                                        id={element.titleId}
                                        type={element.titleType}
                                        showAddToList={false}
                                    />
                                </div>
                            ))}
                        </Flicking>
                    </div>
                ))}
            </div>
        );
    }
}

export default ListOverview;
