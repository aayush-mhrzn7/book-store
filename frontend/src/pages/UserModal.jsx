import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../config";
import { FiMinimize2 } from "react-icons/fi";

function UserModal({ username, email, address, id }) {
  const [close, setClose] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("address", address);
  }, [address]);
  const updateUser = async (data) => {
    console.log(data);
    const response = await axios.patch(
      `${config.backendUrl}update-address`,
      data,
      {
        withCredentials: true,
      }
    );

    if (!response) {
      alert("failed to update");
    } else {
      alert("updated");
    }
  };
  const closed = () => {
    setClose(!close);
  };
  return close ? null : (
    <div className="  inset-0 bg-black bg-opacity-50 z-40 h-[150vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center font-primary items-center">
      <form
        onSubmit={handleSubmit(updateUser)}
        className="flex relative w-[80%] lg:w-[50%] p-20  inset-0   z-50 flex-col bg-white  shadow-2xl rounded-2xl "
      >
        <FiMinimize2
          className="absolute top-10 right-10"
          onClick={() => closed()}
        />
        <label htmlFor="username" className="font-semibold capitalize">
          username
        </label>
        <input
          className="p-2 w-full border-2 my-3"
          type="text"
          value={username}
          autoComplete="off"
          id="username"
          {...register("username", {
            required: true,
          })}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <label htmlFor="email" className="font-semibold capitalize">
          email
        </label>
        <input
          type="text"
          value={email}
          autoComplete="off"
          className="p-2 w-full border-2 my-3"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="address" className="font-semibold capitalize">
          address
        </label>
        <input
          type="text"
          className="p-2 w-full border-2 my-3"
          id="address"
          {...register("address", {
            onChange: (e) => e.target.value,
            required: true,
          })}
        />
        {errors.address && <p>{errors.address.message}</p>}

        <button
          type="submit"
          className="py-2 w-full bg-blue-600 text-white rounded-md my-4 font-semibold"
        >
          Update Address
        </button>
      </form>
      )
    </div>
  );
}

export default UserModal;
