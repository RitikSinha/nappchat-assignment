import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
function App() {
  const navigate = useNavigate();
  const signOut = (e) => {
    console.log("clicked");
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) return navigate("/login");
  });
  return (
    <div className="App">
      <Navbar />
      <div className="flex">
        <div className="w-1/4 bg-slate-300 h-[90vh]">
          <Card name="Aman Singh" />
          <button
            className=" fixed bottom-0 btn-accent btn-md mb-5 "
            onClick={signOut}
          >
            logout
          </button>
        </div>
        <div className="w-3/4">
          <div className="m-5">
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-primary">
                What kind of nonsense is this
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">
                Calm down, Anakin.
              </div>
            </div>
          </div>
          <div className=" fixed bottom-0 m-5 w-full flex items-center">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-lg w-1/2 "
            />
            <button className="btn btn-primary ml-5">send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
