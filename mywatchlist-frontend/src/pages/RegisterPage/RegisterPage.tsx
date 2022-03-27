import { Component } from "react";
import { Link } from "react-router-dom";
import Registration from "../../components/Registration/Registration";

export default class RegisterPage extends Component {
    render() {
        return (
            <div className="p-10">
                <Registration />
            </div>
        )
    }
}