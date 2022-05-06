import { Component } from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { getTVImages } from "../../api/API";
import { apiConfig } from "../../Config";

export default class StartPage extends Component<{}, { poster: string }> {
    constructor(props) {
        super(props);
        this.state = {
            poster: "",
        };
    }
    async componentDidMount() {
        var mandalorian = await getTVImages(82856);
        var posters = mandalorian.data.posters;
        this.setState({
            poster: apiConfig.w500Image(posters[0].file_path),
        });
    }
    render() {
        return (
            <Flicking circular={true}>
                <div style={{ width: "120px" }}>1</div>
                <div style={{ width: "20%" }}>2</div>
                <div style={{ width: "500px" }}>3</div>
                <div style={{ width: "300px" }}>4</div>
                <div style={{ width: "100%" }}>5</div>
                <div className="m-2">
                    <img src={this.state.poster} className="w-1/2"/>
                </div>
            </Flicking>
        );
    }
}
