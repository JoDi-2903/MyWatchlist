import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export interface ThemeState {
    darkMode: boolean;
}

class ToggleTheme extends Component<{}, ThemeState> {
    constructor(props: any) {
        super(props);
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.className = "dark";
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
            <div>
                <div className="w-16 align-middle select-none transition duration-200 ease-in bg-grey">
                    <input
                        type="checkbox"
                        name="toggle"
                        className="absolute w-6 h-6 rounded-full border-white border-4 appearance-none cursor-pointer bg-white translate-x-1 checked:translate-x-7 checked:dark:bg-white transition duration-100"
                        onClick={this.toggleThemeHandler}
                    />
                    <label htmlFor="toggle" className="toggle-label justify-self-auto h-9 rounded-full bg-gray-300 cursor-pointer space-x-2 pl-2 pr-2 px-1 py-1 m-auto">
                        <FontAwesomeIcon icon={faMoon} />
                        <FontAwesomeIcon icon={faSun} />
                    </label>
                </div>
            </div>
        );
    }
}

export default ToggleTheme;
