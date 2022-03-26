import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/StartPage/StartPage";

interface AppProps {}

interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div className="dark:bg-dark_bg">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      </div>
    );
  }
}
