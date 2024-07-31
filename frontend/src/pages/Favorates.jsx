import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Favorates() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await axios.get(`${config.backendUrl}all-favorate`, {
        withCredentials: true,
      });
      setLoading(false);
      console.log(response.data.books);
      setBooks(response.data.books);
    };
    fetch();
  }, []);
  return loading ? (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div className="h-[100vh] w-full mb-40 p-10 font-primary">
      <div>
        <h1 className="text-4xl font-semibold mb-10 font-primary">
          My Favorites
        </h1>
        <div className="grid xl:grid-cols-4 grid-cols-2 gap-10  max-sm:grid-cols-1 mb-16">
          {books?.map((book, index) => (
            <div
              onClick={() => navigate(`/book/${book._id}`)}
              className=" hover:scale-110 transition-all font-primary border-2 w-full shadow-md p-4 rounded-lg "
              key={index}
            >
              <div className="w-full">
                <img
                  src={book.url}
                  className="object-cover object-center w-full h-80 "
                  alt="book-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold capitalize text-xl mt-4">
                  {book.title}
                </h3>
                <p className="my-2 text-[17px]">
                  {book.description.length > 100
                    ? book.description.slice(0, 100) + "...."
                    : null}
                </p>
                <button className="font-semibold p-3 w-full text-white  rounded-lg bg-blue-600">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorates;
