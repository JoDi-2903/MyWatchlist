import { Component } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

export interface ThemeState {
    darkMode: boolean;
}

class ThemeSwitch extends Component<{}, ThemeState> {
    constructor(props: any) {
        super(props);
        if (window.matchMedia("(prefers-color-scheme: dark)").matches)
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
                    className="absolute left-1 top-1 w-8 h-8 rounded-full align-middle appearance-none cursor-pointer bg-white checked:translate-x-10 checked:bg-black transition-transform ease-in-out duration-300 "
                    onClick={this.toggleThemeHandler}
                />
                <label
                    htmlFor="toggle"
                    className="flex h-10 px-2 gap-4 align-middle rounded-full border dark:border-white border-black cursor-pointer"
                >
                    <SunIcon className="w-6 text-black" />
                    <MoonIcon className="w-6 dark:text-white text-black " />
                </label>
            </div>
        );
    }
}

export default ThemeSwitch;
