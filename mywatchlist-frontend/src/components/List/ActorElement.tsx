import { Component, ReactNode } from "react";
import { getPersonImages } from "../../api/API";
import { apiConfig } from "../../Config";
import { Link } from "react-router-dom";
import Cover from "../Search/Cover";
import Card from "../Wrapper/Card";


interface ListElementProps {
    type: string;
    id: number;
    title: string;
    vote_average: number;
    first_air_date: string;
}

interface ListElementState { 
    poster_actor: string;
}

export default class ActorElement extends Component<
    ListElementProps,
    ListElementState
> {
    constructor(props) {
        super(props);
        this.state = {
            poster_actor: "",
        };
    }
    async componentDidMount() {
        var personImages = await getPersonImages(this.props.id);
        var profiles = personImages.data.profiles;
        this.setState({
            poster_actor: apiConfig.originalImage(profiles[0].file_path),
        });
    }
    render() {
        return (
            <div>
                <Card
                    classes="my-4 grid grid-cols-8 drop-shadow-xl p-4 w-80 h-36 gap-3"
                    key={this.props.id}
                >
                    <Cover name={this.props.title} path={this.state.poster_actor} />
                    <div className="col-span-5 grid grid-cols-1 items-start content-start overflow-hidden">
                        <h1 className="text-black dark:text-white text-xl truncate font-semibold">
                            {this.props.title}
                        </h1>
                        <p className="self-start text-primary dark:text-primary text-base w-full mt-1">
                            {this.props.first_air_date}
                        </p>
                    </div>
                </Card>
            </div>
        );
    }
}

