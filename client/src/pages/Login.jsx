import React, { useState, useContext, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import handimg from "../assets/hand.png";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContex";
import { loginCall } from "../helper/loginCall";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigate("/");
    }
  });
  return (
    <main>
      <div className="mt-5">
        <img
          className="mx-auto"
          alt="logo"
          src={logo}
          width="200"
          height="100"
        />
      </div>
      <div className="card w-3/4 my-10  bg-base-100 shadow-xl flex mx-auto justify-around flex-row">
        <div className="mt-5">
          <h1 className=" text-2xl font-medium">Welcome to noAppChat</h1>
          <p className=" text-sm">Enter your credentials to login </p>
          <div className=" flex flex-col w-full h-3/4 justify-around">
            <input
              type="email"
              placeholder="email"
              className="input input-bordered input-primary w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="input input-bordered input-primary w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isFetching ? (
              <div className="radial-progress" style={{ "--value": 70 }}>
                70%
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleClick}>
                Login
              </button>
            )}

            <p className="text-sm">
              Not a member{" "}
              <Link href="/register">
                {" "}
                <span className=" text-green-500">Sign Up</span>{" "}
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-5">
          <img alt="logo" src={handimg} width="400" height="100" />
        </div>
      </div>
    </main>
  );
};

export default Login;
