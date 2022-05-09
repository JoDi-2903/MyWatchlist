import { Component, ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    classes: string;
}

export default class Card extends Component<CardProps> {
    public static defaultProps = {
        classes: "",
    };
    render() {
        return (
            <div
                className={
                    "bg-white dark:bg-card_dark drop-shadow-lg m-4 p-4 " +
                    this.props.classes
                }
            >
                {this.props.children}
            </div>
        );
    }
}
