import React, { useEffect, lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Authentication from "./utils/authentication";
//lazy loading
import config from "./config";
import axios from "axios";
import { login } from "../store/authSlice";
import Loader from "./components/Loader";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Error = lazy(() => import("./pages/Error"));
const Home = lazy(() => import("./pages/Home"));
const AllBooks = lazy(() => import("./pages/AllBooks"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Book = lazy(() => import("./pages/Book"));
const Favorates = lazy(() => import("./pages/Favorates"));
const AddBook = lazy(() => import("./pages/AddBook"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${config.backendUrl}get-user`, {
        withCredentials: true,
      });
      if (response.data.data) {
        dispatch(login(response.data.data));
      }
    })();
  }, []);
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Authentication>
                <Home />
              </Authentication>
            }
          />
          <Route
            path="/all-books"
            element={
              <Authentication>
                <AllBooks />
              </Authentication>
            }
          />
          <Route
            path="/book/:id"
            element={
              <Authentication>
                <Book />
              </Authentication>
            }
          />
          <Route
            path="/signup"
            element={
              <Authentication authentication={false}>
                <Signup />
              </Authentication>
            }
          />
          <Route
            path="/login"
            element={
              <Authentication authentication={false}>
                <Login />
              </Authentication>
            }
          />
          <Route
            path="/cart"
            element={
              <Authentication>
                <Cart />
              </Authentication>
            }
          />
          <Route
            path="/add-book"
            element={
              <Authentication>
                <AddBook />
              </Authentication>
            }
          />
          <Route
            path="/profile"
            element={
              <Authentication>
                <Profile />
              </Authentication>
            }
          />
          <Route
            path="/favorates"
            element={
              <Authentication>
                <Favorates />
              </Authentication>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Authentication>
                <Dashboard />
              </Authentication>
            }
          />
          <Route
            path="*"
            element={
              <Authentication>
                <Error />
              </Authentication>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
