import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useSelector } from "react-redux";
import Modal from "./Modal";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [open, setopen] = useState(false);
  const setOpen = () => {
    setopen(!open);
  };
  const navigate = useNavigate();
  //getting book information
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(` ${config.backendUrl}book/${id}`);
      setBook(response.data.data);
    };
    fetch();
  }, []);
  //getting admin
  const payload = useSelector((state) => state.auth.data);
  console.log(payload);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (payload.role != "admin") {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, []);
  async function addToFavorate(id) {
    console.log(id);
    const response = await axios.patch(
      `${config.backendUrl}add-favorate/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(response);
    navigate("/favorates");
  }
  async function DeleteBook(id) {
    const response = await axios.delete(
      `${config.backendUrl}delete-book/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(response);

    if (response) {
      alert("Book hass been sucessfully deleted");
    } else alert("Error during deletind a book");
  }
  let favorate = payload.favorates.find((id) => id === book._id);
  if (favorate) {
    favorate = true;
  } else {
    favorate = false;
  }
  console.log(favorate);
  return (
    <section className="w-full h-[90vh] p-10 font-primary">
      <div className="flex gap-10">
        <div className="w-1/3">
          <h1 className="text-3xl font-semibold mb-8">{book.title}</h1>
          <span className=" mb-5 block">
            <strong className="text-[17px] inline ">Book id:</strong> {book._id}
          </span>
          <img src={book.url} className="w-full" alt="" />
        </div>
        <div className="w-2/3">
          <h3 className="text-2xl font-semibold mb-6">{book.author}</h3>
          <span className="capitalize font-semibold mb-3 inline-block p-3 bg-green-400  rounded-lg">
            {book.language}
          </span>
          {open ? <Modal id={book._id} /> : null}
          <p className="text-xl">{book.description}</p>
          <h2 className="text-5xl my-10">
            {book.price}Rs <span className="inline-block text-2xl ">only</span>
          </h2>

          {admin ? (
            <>
              <button
                onClick={() => DeleteBook(book._id)}
                className="cursor-pointer hover:scale-110 transition-all p-3 bg-red-400 mr-4 rounded-lg font-semibold my-4"
              >
                Delete Book
              </button>
              <button
                onClick={() => {
                  setOpen();
                }}
                className="cursor-pointer hover:scale-110 transition-all p-3 bg-yellow-400 mr-4 rounded-lg font-semibold my-4"
              >
                Update Book
              </button>
            </>
          ) : (
            <div>
              <button className=" cursor-pointer hover:scale-110 transition-all p-3 bg-blue-400 mr-4 rounded-lg font-semibold my-4">
                Add to cart
              </button>
              {favorate ? (
                <button
                  onClick={() => {
                    addToFavorate(book._id);
                  }}
                  className=" cursor-pointer hover:scale-110 transition-all p-3 bg-green-400 mr-4 rounded-lg font-semibold my-4"
                >
                  Remove from Favorates
                </button>
              ) : (
                <button
                  onClick={() => {
                    addToFavorate(book._id);
                  }}
                  className=" cursor-pointer hover:scale-110 transition-all p-3 bg-green-400 mr-4 rounded-lg font-semibold my-4"
                >
                  Add to Favorates
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Book;
