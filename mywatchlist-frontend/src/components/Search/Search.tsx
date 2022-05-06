import { Component } from "react";
import { SearchIcon } from "@heroicons/react/solid";

interface SearchProps{
    onSearchChange;
}
interface SearchState{
    searchQuery: string;
}

class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps){
        super(props);
        this.state = {
            searchQuery: ""
        }
    }
    render() {
        return (
            <div className="inline-flex justify-self-center align-middle w-9/12 m-3 p-2 border border-primary rounded-sm">
                <input
                    className="h-5 lg:h-10 p-4 text-3xl focus:outline-none w-full bg-transparent text-dark dark:text-white "
                    type="search"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => this.setState({searchQuery: e.target.value}, () => this.props.onSearchChange(this.state.searchQuery))}
                    value={this.state.searchQuery}
                />

                <SearchIcon className="h-8 lg:h-10 p-1 text-primary hover:text-color_primary" />
            </div>
        );
    }
}

export default Search;
