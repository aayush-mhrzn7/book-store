import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import Book from "./pages/Book";
import Authentication from "./utils/authentication";
import Favorates from "./pages/Favorates";
import AddBook from "./pages/AddBook";
import config from "./config";
import axios from "axios";
import { login } from "../store/authSlice";

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
      </Routes>
    </Router>
  );
}

export default App;
