import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContex";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const signOut = (e) => {
    console.log("clicked");
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <img
          className="mx-auto"
          alt="logo"
          src={logo}
          width="200"
          height="100"
        />
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center w-[200px] justify-between">
            <p>Hi {user.username}</p>
            <button className=" btn-accent btn-md mb-5 " onClick={signOut}>
              logout
            </button>
          </div>
        ) : (
          <>
            <p>
              {" "}
              <Link to="/login">Please SignIn</Link>{" "}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
