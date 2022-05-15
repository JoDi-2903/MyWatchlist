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
                    "bg-gray-50 dark:bg-dark_navbar drop-shadow-lg m-4 p-4 " +
                    this.props.classes
                }
            >
                {this.props.children}
            </div>
        );
    }
}
