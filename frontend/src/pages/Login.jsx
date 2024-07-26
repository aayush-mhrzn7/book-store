import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import config from "../config";
import Loader from "../components/Loader";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitForm = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${config.backendUrl}login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      console.log(response.data.user);
      dispatch(login(response.data.user));
      navigate("/");
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setLoginError(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-1/2 md:w-1/3">
          <h1 className="text-2xl text-center font-semibold">Login</h1>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-4 w-full"
          >
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
            <button className="w-full bg-blue-300 p-2 rounded-lg" type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
