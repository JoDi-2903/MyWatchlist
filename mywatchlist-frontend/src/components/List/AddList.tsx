import { Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import { getUsername, JWTInfo } from "../../security/JWTContext";

interface AddListProps {
    jwtInfo: JWTInfo;
}
interface AddListState {
    newTitle: string;
}

class AddList extends Component<AddListProps, AddListState> {
    constructor(props: AddListProps) {
        super(props);
        this.state = {
            newTitle: "",
        };

        this.addList = this.addList.bind(this);
    }

    async addList(event: React.SyntheticEvent) {
        event.preventDefault();

        var responeStatus: number = 0;
        var responseText: string = "";

        await fetch(backendURL + "/watchlist/newWatchlist", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + this.props.jwtInfo.jwt,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: getUsername(),
                watchlistName: this.state.newTitle,
            }),
        })
            .then((response) => {
                responeStatus = response.status;
                return response.json();
            })
            .then((data) => (responseText = data.response));

        if (responeStatus === 201) {
            toast.success(responseText);
        } else {
            toast.error(responseText);
        }
    }

    render() {
        return (
            <form onSubmit={this.addList} className="grid grid-cols-2  content-center items-center w-3/4 xl:w-1/2 mx-auto">
                <input
                    type="text"
                    id="name"
                    value={this.state.newTitle}
                    onChange={(e) =>
                        this.setState({ newTitle: e.target.value })
                    }
                    className=" m-4 p-4 bg-dark_input rounded-full drop-shadow-xl h-10 text-xl focus:outline-none  bg-transparent text-white"
                />
                <input
                    type="submit"
                    value="Create new List"
                    className="w-fit h-10 p-2 text-white dark:text-dark_navbar border border-primary hover:border-primary-200 rounded-lg shadow bg-primary hover:bg-primary-200"
                />
            </form>
        );
    }
}

export default AddList;
