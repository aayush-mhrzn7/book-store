import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import config from "../config";

function Signup() {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    try {
      const response = await axios.post(`${config.backendUrl}signup`, {
        username: data.username,
        email: data.email,
        password: data.password,
        address: data.address,
      });
      alert(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setLoginError(error);
    }
  };
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div>
        <h1 className="text-2xl text-center font-semibold">Signup</h1>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("username", { required: "username is required" })}
            />
            {errors.username ? (
              <p className="text-red-500">{errors.username.message}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {loginError && <p className="text-red-500">{loginError}</p>}
          <div>
            <label htmlFor="text">Address</label>
            <input
              type="text"
              id="Address"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register("address", { required: "address is required" })}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <button className="w-full bg-blue-300 p-2 rounded-lg" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
