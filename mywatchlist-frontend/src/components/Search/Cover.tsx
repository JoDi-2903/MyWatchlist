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
                debounce={500}
                className="h-40 w-auto col-span-3"
                placeholder={<ScaleLoader css="text-black dark:text-white" />}
            >
                <img
                    src={apiConfig.w500Image(this.props.path)}
                    alt="No image found."
                    className="h-40 w-auto relative -top-6 drop-shadow-xl bg-primary-100 text-center"
                />
            </LazyLoad>
        );
    }
}

export default Cover;
