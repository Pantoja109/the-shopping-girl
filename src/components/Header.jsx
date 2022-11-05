import React from "react";
import { ReactComponent as Icon } from "../assets/svg/shopping-girl-icon.svg";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-base-200">
      <nav className="navbar justify-between px-6">
        <Link to="/" className="w-30">
          <Icon width="100" height="58" className="fill-current" />
        </Link>
        <Link to={"/profile"}>
          <FaUserAlt className="text-2xl" />
        </Link>
      </nav>
    </header>
  );
}
