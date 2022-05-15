import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import Cover from "../Search/Cover";
import Card from "../Wrapper/Card";
import ReactStarsRating from "react-awesome-stars-rating";
import { JWTContext } from "../../security/JWTContext";
import addElementToList, {
    getFullTVList,
    getMovieDetail,
    getTVDetail,
} from "../../api/API";

interface ListElementProps {
    type: string;
    id: number;
    showAddToList: boolean;
}

interface ListElementState {
    title: string;
    poster_path: string;
    vote_average: number;
    first_air_date: string;
}

class ListElement extends Component<ListElementProps, ListElementState> {
    constructor(props: ListElementProps) {
        super(props);

        this.state = {
            title: "",
            poster_path: "",
            vote_average: 0,
            first_air_date: "",
        };
    }

    async componentDidMount() {
        if (this.props.type === "movie") {
            var movie = await getMovieDetail(this.props.id);
            this.setState({
                title: movie.data.original_title,
                poster_path: movie.data.poster_path,
                vote_average: Math.round(movie.data.vote_average / 2),
                first_air_date: movie.data.release_date,
            });
        } else {
            var tv = await getTVDetail(this.props.id);
            this.setState({
                title: tv.data.original_name,
                poster_path: tv.data.poster_path,
                vote_average: Math.round(tv.data.vote_average / 2),
                first_air_date: tv.data.first_air_date,
            });
        }
    }

    render(): ReactNode {
        return (
            <Card
                classes="my-4 grid grid-cols-8 drop-shadow-xl p-4 w-72 h-36 gap-3"
                key={this.props.id}
            >
                <Cover name={this.state.title} path={this.state.poster_path} />
                <div className="col-span-5 grid grid-cols-1 items-start content-start overflow-hidden">
                    <Link to={"/" + this.props.type + "/" + this.props.id}>
                        <h1 className="text-white_text dark:text-dark_text text-xl truncate">
                            {this.state.title}
                        </h1>
                    </Link>
                    <ReactStarsRating
                        className="flex cursor-default"
                        isHalf={true}
                        isEdit={false}
                        size={15}
                        count={5}
                        value={this.state.vote_average}
                    />
                    <p className="self-start text-white_text dark:text-dark_text text-xs w-full">
                        First aired on: {this.state.first_air_date}
                    </p>
                    {this.props.showAddToList ? (
                        <JWTContext.Consumer>
                            {({ jwtInfo }) => (
                                <button
                                    onClick={async () => {
                                        var tvlist;
                                        if (this.props.type === "tv") {
                                            tvlist = await getFullTVList(
                                                this.props.id
                                            );
                                        } else {
                                            tvlist = [];
                                        }
                                        addElementToList(
                                            jwtInfo,
                                            this.props.id,
                                            this.props.type,
                                            tvlist
                                        );
                                    }}
                                    className="text-left text-white_text dark:text-dark_text cursor-pointer underline text-sm pt-2"
                                >
                                    Add to list
                                </button>
                            )}
                        </JWTContext.Consumer>
                    ) : (
                        ""
                    )}
                </div>
            </Card>
        );
    }
}

export default ListElement;
