import { Component } from "react";

interface SearchFilterProps {
    updateValues;
}

interface SearchFilterState {
    adult: boolean;
    region: string;
}

class SearchFilter extends Component<SearchFilterProps, SearchFilterState> {
    constructor(props: SearchFilterProps) {
        super(props);
        this.state = {
            adult: true,
            region: "",
        };
    }

    render() {
        return (
            <div>
                <input id="adult" type="checkbox" />
                <label htmlFor="adult" className="text-white">Include adult content</label>
            </div>
        );
    }
}

export default SearchFilter;
