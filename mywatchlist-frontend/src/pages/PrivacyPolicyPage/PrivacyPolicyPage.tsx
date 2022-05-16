import { Component } from "react";

export default class PrivacyPolicyPage extends Component {
    render() {
        return (
            <main className="w-1/2 mx-auto text-white_text dark:text-dark_text m-4 p-5">
                <h1 className="text-4xl mb-4 font-bold">MyWatchlist Privacy Policy</h1>
                <h2 className="text-2xl my-2 font-bold">What data do we collect?</h2>
                <p>
                    We collect the following data:
                    <ul className="list-disc pl-6">
                        <li>Username</li>
                        <li>E-Mail address</li>
                        <li>Your created lists with the entries</li>
                    </ul>
                </p>
                <h2 className="text-2xl my-2 font-bold">How do we collect your data?</h2>
                <p>
                    You directly provide MyWatchlist with most of the data we collect. We collect data and process data when you:
                    <ul className="list-disc pl-6">
                        <li>Register online</li>
                        <li>Create a list</li>
                        <li>Save an entry to a list</li>
                    </ul>
                </p>
                <h2 className="text-2xl my-2 font-bold">How will we use your data?</h2>
                <p>
                    MyWatchlist collects your data so that we can:
                    <ul className="list-disc pl-6">
                        <li>Save your account</li>
                        <li>Save your lists and entries</li>
                    </ul>
                </p>
                <h2 className="text-2xl my-2 font-bold">Cookies</h2>
                <p>We do not use any cookies on this page.</p>
                <h2 className="text-2xl my-2 font-bold">Marketing</h2>
                <p>We do not advertise on this site or send you emails with advertisements.</p>
                <h2 className="text-2xl my-2 font-bold">Changes to our privacy policy</h2>
                <p>This privacy policy was last updated on 15 May 2022.</p>
                <h2 className="text-2xl my-2 font-bold">How to contact us</h2>
                <p>tbd</p>
            </main>
        );
    }
}
