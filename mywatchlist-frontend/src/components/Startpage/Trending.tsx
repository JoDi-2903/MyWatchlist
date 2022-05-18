import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { addElementToList } from "../../api/API";
import { apiConfig } from "../../Config";
import { getJWT, getUsername, JWTInfo } from "../../security/JWTContext";
import Card from "../Wrapper/Card";

interface TrendingProps {
    trendingList;
}

interface TrendingState {
    trendingList;
}

export default class Trending extends Component<TrendingProps, TrendingState> {
    constructor(props: TrendingProps) {
        super(props);
        this.state = {
            trendingList: this.props.trendingList,
        };
    }

    componentDidUpdate() {
        if (this.props.trendingList !== this.state.trendingList) {
            this.setState({
                trendingList: this.props.trendingList,
            });
        }
    }

    render(): ReactNode {
        return (
            <div className="h-screen">
                <Flicking
                    circular={true}
                    renderOnlyVisible={true}
                    align={"prev"}
                >
                    {this.state.trendingList.map((element) => (
                        <div className="w-screen" key={element.id}>
                            <div className="bg-gradient-to-b from-transparent via-dark_bg to-dark_bg bg-cover bg-center relative -top-24">
                                <img
                                    src={apiConfig.originalImage(
                                        element.backdrop_path
                                    )}
                                    className="w-screen h-screen  object-cover mix-blend-overlay z-0 pointer-events-none"
                                />
                            </div>
                            <div className="absolute top-24 left-24 w-3/12 bg-dark_bg/50 p-10 rounded">
                                <h1 className="text-4xl text-primary drop-shadow-2xl font-bold mb-6 truncate">
                                    {element.media_type === "movie" ? (
                                        <Link to={"/movie/" + element.id}>
                                            {element.title}
                                        </Link>
                                    ) : (
                                        <Link to={"/tv/" + element.id}>
                                            {element.name}
                                        </Link>
                                    )}
                                </h1>
                                <p className="text-dark_text text-xl font-bold drop-shadow-2xl mb-4 h-64 overflow-hidden">
                                    {element.overview}
                                </p>
                                <div className="flex justify-between gap-4">
                                    <button
                                        className="bg-primary p-4 rounded flex gap-4 items-center "
                                        onClick={() =>
                                            addElementToList(
                                                {
                                                    jwt: getJWT(),
                                                    username: getUsername(),
                                                } as JWTInfo,
                                                element.id,
                                                element.media_type,
                                                []
                                            )
                                        }
                                    >
                                        <PlusCircleIcon className="h-8" />
                                        Add to List
                                    </button>

                                    <Link
                                        to={
                                            "/" +
                                            element.media_type +
                                            "/" +
                                            element.id
                                        }
                                    >
                                        <button className="bg-dark_bg p-4 rounded flex gap-4 items-center text-dark_text">
                                            <InformationCircleIcon className="h-8" />
                                            More information
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </Flicking>
            </div>
        );
    }
}
