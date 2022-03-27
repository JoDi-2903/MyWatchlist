import { Component } from "react";
import { SearchIcon } from "@heroicons/react/solid";

class Search extends Component {
    render() {
        return (
            <div className="inline-flex justify-self-center align-middle w-9/12 m-2 border-2 border-black dark:border-white bg-white dark:bg-dark_bg rounded-lg text-black">
                <input
                    className="h-5 lg:h-10 p-4 text-sm focus:outline-none w-full"
                    type="search"
                    name="search"
                    placeholder="Search"
                />

                <SearchIcon className="h-8 lg:h-10 p-1 bg-white text-black cursor-pointer hover:text-color_primary" />
            </div>
        );
    }
}

export default Search;
