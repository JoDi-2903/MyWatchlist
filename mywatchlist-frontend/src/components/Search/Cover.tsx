import { Component } from "react";
import { apiConfig } from "../../Config";
import LazyLoad from "react-lazyload";
import ScaleLoader from "react-spinners/ScaleLoader";

interface CoverProps {
    path: string;
    name: string;
}

class Cover extends Component<CoverProps, {}> {
    render() {
        return (
            <LazyLoad
                className="h-32 w-auto col-span-3"
                offset={50}
                once
                placeholder={<ScaleLoader color="#E67082" />}
            >
                <img
                    src={apiConfig.w500Image(this.props.path)}
                    alt="Not found."
                    className="h-32 w-auto relative -top-6 drop-shadow-xl bg-primary-100 text-center pointer-events-none"
                />
            </LazyLoad>
        );
    }
}

export default Cover;
