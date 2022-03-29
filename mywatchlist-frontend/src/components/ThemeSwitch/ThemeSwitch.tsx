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
            this.setState({ darkMode: false });
        } else {
            document.documentElement.className = "dark";
            this.setState({ darkMode: true });
        }
    };

    render() {
        return (
            <div className="flex relative">
                <input
                    type="checkbox"
                    name="toggle"
                    className="absolute left-1 top-1 w-6 h-6 rounded-full align-middle appearance-none cursor-pointer checked:bg-primary checked:translate-x-8 bg-white transition-transform ease-in-out duration-300 translate-x-0.5"
                    onClick={this.toggleThemeHandler}
                />
                <label
                    htmlFor="toggle"
                    className="flex h-8 px-2 gap-4 align-middle rounded-full border border-white cursor-pointer"
                >
                    <SunIcon className="w-4 text-white" />
                    <MoonIcon className="w-4 text-white " />
                </label>
            </div>
        );
    }
}

export default ThemeSwitch;
