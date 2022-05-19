import { Component } from "react";

export default class PrivacyPolicyPage extends Component {
    render() {
        return (
            <main className="w-1/2 mx-auto text-white_text dark:text-dark_text m-4 p-5">
                <h1 className="text-4xl mb-12 font-bold">MyWatchlist Privacy Policy</h1>
                <h2 className="text-2xl my-2 font-bold">What data do we collect?</h2>
                <p>
                    We collect the following data:
                    <ul className="list-disc pl-6">
                        <li>Username</li>
                        <li>E-Mail address</li>
                        <li>Your created lists with the entries</li>
                    </ul>
                </p>
                <h2 className="text-2xl my-2 mt-5 font-bold">How do we collect your data?</h2>
                <p>
                    You directly provide MyWatchlist with most of the data we collect. We collect data and process data when you:
                    <ul className="list-disc pl-6">
                        <li>Register online</li>
                        <li>Create a list</li>
                        <li>Save an entry to a list</li>
                    </ul>
                </p>
                <h2 className="text-2xl my-2 mt-5 font-bold">How will we use your data?</h2>
                <p>
                    MyWatchlist collects your data so that we can:
                    <ul className="list-disc pl-6">
                        <li>Save your account</li>
                        <li>Save your lists and entries</li>
                    </ul>
                </p>
                <h2 className="text-2xl my-2 mt-5 font-bold">How to contact us</h2>
                <a className="text-primary" href="mailto:info@mywatchlist.com">info@mywatchlist.com</a><br />
                <p>
                    DHBW Stuttgart<br />
                    Rotebühlstrasse 133<br />
                    70197 Stuttgart<br />
                    Germany</p>
                <h2 className="text-2xl my-2 mt-5 font-bold">Cookies</h2>
                <p>We do not use any cookies on this page.</p>
                <h2 className="text-2xl my-2 mt-5 font-bold">Marketing</h2>
                <p>We do not advertise on this site or send you emails with advertisements.</p>
                <h2 className="text-2xl my-2 mt-5 font-bold">Information about your right to object according to Art. 21 DSGVO Individual right of objection</h2>
                <p>You have the right to object at any time, on grounds relating to your particular situation, to the processing of personal data relating to you which is carried out on the basis of Art. 6(1)(f) DSGVO (data processing on the basis of a balance of interests); this also applies to profiling based on this provision within the meaning of Art. 4 No. 4 DSGVO.</p>
                <p>If you object, we will no longer process your personal data unless we can demonstrate compelling legitimate grounds for the processing which override your interests, rights and freedoms, or the processing serves the assertion, exercise or defense of legal claims.</p>
                <h2 className="text-2xl my-2 mt-5 font-bold">Changes to our privacy policy</h2>
                <p>We reserve the right to adapt this data protection declaration so that it always complies with the current legal requirements or in order to implement changes to our services in the data protection declaration, e.g. when introducing new services. The new privacy policy will then apply to your next visit.</p>
                <p>This privacy policy was last updated on 19 May 2022.</p>

            </main>
        );
    }
}
