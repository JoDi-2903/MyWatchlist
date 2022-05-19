import { Component } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../../Config";
import { getUsername, JWTInfo } from "../../security/JWTContext";

interface AddListProps {
    jwtInfo: JWTInfo;
    onAdded;
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

        await fetch(backendURL + "/watchlist/new-watchlist", {
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
            this.props.onAdded();
        } else {
            toast.error(responseText);
        }
    }

    render() {
        return (
            <form onSubmit={this.addList} className="grid grid-cols-4 content-center items-center gap-4 w-3/4 xl:w-2/3 mx-auto bg-gray-50 dark:bg-dark_navbar p-6 drop-shadow-lg my-5">
                <input
                    type="text"
                    id="name"
                    value={this.state.newTitle}
                    onChange={(e) =>
                        this.setState({ newTitle: e.target.value })
                    }
                    placeholder="Title"
                    className="col-span-3 p-4 bg-white dark:bg-dark_input rounded drop-shadow h-12 text-xl focus:outline-none text-black dark:text-white"
                />
                <input
                    type="submit"
                    value="Add"
                    className="col-span-1 h-12 flex justify-between gap-2 rounded-md bg-white_bg dark:bg-dark_bg cursor-pointer  drop-shadow dark:text-dark_text hover:dark:bg-card_dark text-xl"
                />
            </form>
        );
    }
}

export default AddList;
