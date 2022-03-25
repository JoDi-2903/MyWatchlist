import { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";

interface StartPageProps{

}

export default class StartPage extends Component<StartPageProps>{
    render(){
        return(
            <div className="App">
                <h2 className="font-extrabold text-7x1 text-center">Coming soon!</h2>
            </div>
        )
    }
}