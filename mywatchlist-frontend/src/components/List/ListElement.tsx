import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import Cover from "../Search/Cover";
import Card from "../Wrapper/Card";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";
import { JWTContext, JWTInfo } from "../../security/JWTContext";
import { backendURL } from "../../Config";
import toast from "react-hot-toast";

interface ListElementProps {
    type: string;
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    first_air_date: string;
}

interface ListElementState {}

class ListElement extends Component<ListElementProps, ListElementState> {
    constructor(props: ListElementProps) {
        super(props);

        this.addElementToList = this.addElementToList.bind(this);
    }

    async addElementToList(jwtInfo: JWTInfo) {
        var responseStatus: number = 0;
        var responseData;
        await fetch(
            backendURL + "/watchlist/getwatchlists/" + jwtInfo.username,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + jwtInfo.jwt,
                },
            }
        )
            .then((response) => {
                responseStatus = response.status;
                return response.json();
            })
            .then((data) => {
                responseData = data;
            });
        if (responseStatus === 200) {
            var optionsList = responseData.map((list) => list.watchlistName);
            Swal.fire({
                icon: "question",
                title:
                    "To which list the " +
                    this.props.type +
                    " should be added?",
                showCancelButton: true,
                reverseButtons: true,
                input: "select",
                inputOptions: optionsList,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    var body;
                    if (this.props.type == "movie") {
                        body = {
                            username: jwtInfo.username,
                            watchlistId: responseData[result.value].watchlistId,
                            watchlistEntry: {
                                titleId: this.props.id,
                                titleType: "movie",
                                tvInfoList: [],
                            },
                        };
                    } else {
                        // TODO TV Shows
                    }
                    var addStatus: number = 0;
                    var addStatusText: string = "";
                    await fetch(
                        backendURL + "/watchlist/addWatchlistlistEntry",
                        {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer " + jwtInfo.jwt,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(body),
                        }
                    )
                        .then((response) => {
                            addStatus = response.status;
                            return response.json();
                        })
                        .then((data) => (addStatusText = data.response));
                    if (addStatus === 201) {
                        Swal.fire({
                            icon: "success",
                            title: addStatusText,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: addStatusText,
                        });
                    }
                }
            });
        } else {
            toast.error("Could not fetch data.");
        }
    }

    render(): ReactNode {
        return (
            <Card
                classes="my-4 grid grid-cols-8 drop-shadow-xl p-4 w-72 h-36 gap-3"
                key={this.props.id}
            >
                <Cover name={this.props.title} path={this.props.poster_path} />
                <div className="col-span-5 grid grid-cols-1 items-start content-start overflow-hidden">
                    <Link to={this.props.type + "/" + this.props.id}>
                        <h1 className="text-white_text dark:text-dark_text text-xl truncate">
                            {this.props.title}
                        </h1>
                    </Link>
                    <ReactStars
                        value={this.props.vote_average / 2}
                        edit={false}
                        size={20}
                    />
                    <p className="self-start text-white_text dark:text-dark_text text-xs w-full">
                        First aired on: {this.props.first_air_date}
                    </p>
                    <JWTContext.Consumer>
                        {({ jwtInfo, changeJWT }) => (
                            <button
                                onClick={() => this.addElementToList(jwtInfo)}
                                className="text-left text-white_text dark:text-dark_text cursor-pointer underline text-sm pt-2"
                            >
                                Add to list
                            </button>
                        )}
                    </JWTContext.Consumer>
                </div>
            </Card>
        );
    }
}

export default ListElement;
