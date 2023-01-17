import React from "react";

const Card = ({ name }) => {
  return (
    <div className="flex items-center bg-slate-50 mb-2">
      <div className="avatar">
        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
      </div>
    </div>
  );
};

export default Card;
