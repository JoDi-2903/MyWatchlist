import { Component } from "react";
import RegistrationForm from "../../components/Registration/RegistrationForm";

export default class RegisterPage extends Component {
    render() {
        return (
            <main className="p-10">
                <h1 className="text-center text-black dark:text-white text-4xl m-5">
                    Register
                </h1>

                <RegistrationForm />

                <p className="text-center text-gray-500 dark:text-gray-300 text-xs m-2">
                    &copy; 2022 MyWatchlist
                </p>
            </main>
        )
    }
}