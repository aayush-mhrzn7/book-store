import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(` ${config.backendUrl}book/${id}`);
      console.log(response.data.data);
      setBook(response.data.data);
    };
    fetch();
  }, []);
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
          <p className="text-xl">{book.description}</p>
        </div>
      </div>
    </section>
  );
}

export default Book;
