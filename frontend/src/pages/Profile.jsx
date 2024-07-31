import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";
import Modal from "./Modal";
import UserModal from "./UserModal";

function Profile() {
  const [Open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${config.backendUrl}get-user`, {
        withCredentials: true,
      });
      setUserData(response.data.data);
      console.log(response);
    };

    fetch();
  }, []);
  const modalOpen = () => {
    setOpen(!Open);
    console.log(Open);
  };
  return (
    <div className="h-screen flex justify-center items-center w-full font-primary">
      <div className=" bg-slate-300 shadow-md p-10 rounded-lg">
        <h1 className="text-3xl font-semibold mb-16 text-center">
          User Profile
        </h1>
        <div className="flex justify-center gap-4 mt-4">
          <img src={userData.avatar} width={90} />
        </div>
        <div className="flex gap-4 mt-4">
          <h1 className="text-xl font-semibold">Username:</h1>
          <p>{userData.username}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <h1 className="text-xl font-semibold">Email:</h1>
          <p>{userData.email}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <h1 className="text-xl font-semibold">address:</h1>
          <p>{userData.address}</p>
        </div>
        {Open ? (
          <UserModal
            id={userData._id}
            username={userData.username}
            email={userData.email}
            address={userData.address}
          />
        ) : null}
        <button
          onClick={() => modalOpen()}
          className="bg-black font-primary font-semibold text-white p-2 w-full my-5"
        >
          Change address
        </button>
      </div>
    </div>
  );
}

export default Profile;
