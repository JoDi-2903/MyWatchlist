import { Component } from "react";
import { Link } from "react-router-dom";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

import { category, movieType, tvType } from "../../api/tmdbApi";


export default class DemoComponent extends Component {
  public render() {
    return <Flicking circular={true}>
      <div style={{ width: "120px" }}>1</div>
      <div style={{ width: "20%" }}>2</div>
      <div style={{ width: "500px" }}>3</div>
      <div style={{ width: "300px" }}>4</div>
      <div style={{ width: "100%" }}>5</div>
    </Flicking>;
  }
}