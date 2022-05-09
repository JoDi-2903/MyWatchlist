import { Component } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

export interface ThemeState {
    darkMode: boolean;
}

class ThemeSwitch extends Component<{}, ThemeState> {
    constructor(props: any) {
        super(props);
        //if (window.matchMedia("(prefers-color-scheme: dark)").matches) // Set defaul scheme to dark
        document.documentElement.className = "dark";
        this.state = { darkMode: true };
    }

    toggleThemeHandler = () => {
        if (this.state.darkMode) {
            document.documentElement.className = "white";
            document.body.style.backgroundColor = "#F3F4F6";
            this.setState({ darkMode: false });
        } else {
            document.documentElement.className = "dark";
            document.body.style.backgroundColor = "#2E323C";
            this.setState({ darkMode: true });
        }
    };

    render() {
        return (
            <div className="flex relative">
                <input
                    type="checkbox"
                    name="toggle"
                    className="absolute left-1 top-1.5 w-6 h-6 rounded-full align-middle appearance-none cursor-pointer checked:bg-primary checked:translate-x-8 bg-dark_text transition-transform ease-in-out duration-300 translate-x-0.5"
                    onClick={this.toggleThemeHandler}
                />
                <label
                    htmlFor="toggle"
                    className="flex h-9 px-2 gap-4 align-middle rounded-full border-2 border-dark_text cursor-pointer"
                >
                    <SunIcon className="w-4 text-dark_text" />
                    <MoonIcon className="w-4 text-dark_text " />
                </label>
            </div>
        );
    }
}

export default ThemeSwitch;
