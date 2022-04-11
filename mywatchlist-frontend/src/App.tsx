import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/StartPage/StartPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage"
import MoviePage from "./pages/MoviePage/MoviePage"

interface AppProps {}

interface AppState {}

export default class App extends React.Component<AppProps, AppState> {

    render() {
        return (
            <div className="min-h-screen bg-white_bg dark:bg-dark_bg">
                <Router>
                    <div>
                        <Toaster position="bottom-right" />
                    </div>
                    <Navbar />
                    <Routes>
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/start" element={<HomePage />} />
                        <Route path="/movie" element={<MoviePage />} />
                    </Routes>
                </Router>
            </div>
        );
    }
}
