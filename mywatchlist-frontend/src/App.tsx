import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/StartPage/StartPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage"

interface AppProps {}

interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div className="min-h-screen bg-white_bg dark:bg-dark_bg">
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </Router>
      </div>
    );
  }
}
