import { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="bg-gray-600">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between">
            <Link to="/" className="flex items-center space-x-3 m-5">
              <img alt="Logo" src="Logo.svg" className="h-10" />
              <span className="text-3xl text-white">MyWatchlist</span>
            </Link>

            <div className="flex items-center space-x-1">Searchbar</div>

            <div className="flex items-center space-x-1">
              <Link to="/login" className="py-1 px-3 text-white">Login</Link>
              <Link to="/register"className="py-1.5 px-2 text-white border border-emerald-300 rounded shadow">Signup</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
