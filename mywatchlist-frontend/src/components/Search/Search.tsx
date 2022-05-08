import { Component } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/solid";

interface SearchProps {
    onSearchChange;
}
interface SearchState {
    searchQuery: string;
}

class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            searchQuery: "",
        };
    }
    render() {
        return (
            // <div className="inline-flex justify-self-center align-middle w-2/5  m-3 p-2 bg-dark_input rounded-full drop-shadow-xl">
            <div className="inline-flex justify-self-center align-middle w-full m-3 p-2 bg-white dark:bg-dark_input rounded drop-shadow-xl">
                <SearchIcon className="h-10 p-1 text-primary hover:text-color_primary" />
                <input
                    className="h-10 p-2 text-2xl focus:outline-none w-full bg-transparent text-black dark:text-white"
                    type="search"
                    name="search"
                    placeholder="Search"
                    onChange={(e) =>
                        this.setState({ searchQuery: e.target.value }, () =>
                            this.props.onSearchChange(this.state.searchQuery)
                        )
                    }
                    value={this.state.searchQuery}
                />
                {this.state.searchQuery.length > 0 ? (
                    <XIcon
                        className="h-10 p-2 text-primary hover:text-color_primary cursor-pointer"
                        onClick={() => {
                            this.setState({ searchQuery: "" }, () =>
                                this.props.onSearchChange(
                                    this.state.searchQuery
                                )
                            );
                        }}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default Search;
