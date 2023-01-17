import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import handimg from "../assets/hand.png";
import logo from "../assets/logo.png";
import { baseUrl } from "../helper/base";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigate("/");
    }
  });
  const handleClick = async () => {
    if (email && password && fullName) {
      const user = {
        email: email,
        fullName: fullName,
        password: password,
        username: email.split("@")[0],
      };
      try {
        console.log(`${baseUrl}/auth/register`);
        const res = await axios.post(`${baseUrl}/auth/register`, user);
        console.log(res);
        setEmail("");
        setFullName("");
        setPassword("");
        return navigate("/login");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("All fields are required");
    }
  };
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
          <p className=" text-sm">Enter your details to Register </p>
          <div className=" flex flex-col w-full h-3/4 justify-around">
            <input
              type="text"
              placeholder="full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <button className="btn btn-primary" onClick={handleClick}>
              Sign Up
            </button>
            <p className="text-sm">
              Already a member{" "}
              <Link to="/login">
                {" "}
                <span className=" text-green-500">Login</span>
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

export default Register;
