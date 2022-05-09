import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import Cover from "../Search/Cover";
import Card from "../Wrapper/Card";
import ReactStars from "react-rating-stars-component";

interface ListElementProps {
    type:string;
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    first_air_date: string;
}

interface ListElementState {}

class ListElement extends Component<ListElementProps, ListElementState> {
    render(): ReactNode {
        return (
            <Card
                classes="my-4 grid grid-cols-8 drop-shadow-xl p-4 w-72 h-36 gap-3"
                key={this.props.id}
            >
                <Cover name={this.props.title} path={this.props.poster_path} />
                <div className="col-span-5 grid grid-cols-1 items-start content-start overflow-hidden">
                    <Link to={this.props.type + "/" + this.props.id}>
                        <h1 className="text-black dark:text-white text-xl truncate">
                            {this.props.title}
                        </h1>
                    </Link>
                    <ReactStars
                        value={this.props.vote_average / 2}
                        edit={false}
                        size={20}
                    />
                    <p className="self-start text-black dark:text-white text-xs w-full">
                        First aired on: {this.props.first_air_date}
                    </p>
                </div>
            </Card>
        );
    }
}

export default ListElement;
