import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-500 text-white text-center p-4 shadow-md">
      <nav className="mt-4">
        <Link to="/" className="text-white mx-2 hover:text-blue-200">
          Home
        </Link>
        <Link to="/add" className="text-white mx-2 hover:text-blue-200">
          Add Task
        </Link>
      </nav>
    </header>
  );
}

export default Header;
