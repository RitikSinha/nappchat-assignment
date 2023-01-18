import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../helper/base";
const Card = ({ currentUser, conversation }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser?._id);

    const getUser = async () => {
      try {
        const res = await axios(`${baseUrl}/users?userId=` + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="flex items-center bg-slate-50 mb-2">
      <div className="avatar">
        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{user?.username}</h2>
      </div>
    </div>
  );
};

export default Card;
