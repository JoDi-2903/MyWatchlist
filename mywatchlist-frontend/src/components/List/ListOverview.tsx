import { MinusCircleIcon } from "@heroicons/react/solid";
import { Component } from "react";
import Card from "../Wrapper/Card";

interface ListOverviewProps {
    lists;
    deleteWatchlists: boolean;
}

interface ListOverviewState {
    lists;
}

class ListOverview extends Component<ListOverviewProps, ListOverviewState> {
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

    render() {
        return (
            <div>
                {this.state.lists.map((list) => (
                    <Card key={list.watchlistName}>
                        <h2 className="text-3xl text-primary pt-5 mb-5 flex justify-between">
                            {list.watchlistName}
                            {this.props.deleteWatchlists ? (
                                <button>
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
