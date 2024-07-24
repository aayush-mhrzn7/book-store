import React, { useEffect, useState } from "react";
import RecentlyAdded from "../components/RecentlyAdded";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

function AllBooks() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${config.backendUrl}all-books`);

      setBooks(response.data.data);
    };
    fetch();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="h-[90vh] w-full mb-40 p-10">
      <h1 className="text-4xl font-semibold mb-10 font-primary">All Books</h1>
      <div className="grid xl:grid-cols-4 grid-cols-2 gap-10  max-sm:grid-cols-1 mb-16">
        {books.map((book, index) => (
          <div
            onClick={() => navigate(`/book/${book._id}`)}
            className=" hover:scale-110 transition-all font-primary border-2 shadow-md p-4 rounded-lg "
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
              <button className="font-semibold p-3 w-full rounded-lg bg-blue-300">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
      <RecentlyAdded />
    </div>
  );
}

export default AllBooks;
