import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const counterCartItems = useRef(0);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${config.backendUrl}cart`, {
        withCredentials: true,
      });
      setCart(response?.data.cart);
    })();
  }, []);

  useEffect(() => {
    counterCartItems.current = cart.length;
  }, [cart]);

  const memoizedBooks = useMemo(() => cart, [cart]);
  const totalPrice = useMemo(() => {
    return cart.reduce((total, book) => total + book.price, 0);
  }, [cart]);
  const placeAnOrder = async () => {
    const response = await axios.post(
      `${config.backendUrl}place-order`,
      {
        order: cart,
      },
      { withCredentials: true }
    );
    console.log(response);
  };
  return (
    <div className="h-screen w-full font-primary p-10 ">
      <button className="mb-10 font-semibold text-xl " ref={counterCartItems}>
        Cart Items: {counterCartItems.current}
      </button>
      <div className="grid xl:grid-cols-4 grid-cols-2 gap-10  max-sm:grid-cols-1 mb-16">
        {memoizedBooks?.map((book, index) => (
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
              <p className="my-2 text-[17px] ">Rs:{book.price}</p>
              <button className="font-semibold p-3 w-full text-white  rounded-lg bg-blue-600">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className=" w-1/2 font-primary border-2 shadow-md p-4 rounded-lg ">
        <div>
          <h3 className="font-semibold capitalize text-xl mt-4">Total Cost</h3>
          <p className="my-2 text-[17px]">{totalPrice}</p>
          <button
            onClick={() => placeAnOrder()}
            className=" hover:scale-105 transition-all  font-semibold p-3 w-full text-white  rounded-lg bg-blue-600"
          >
            Order Books
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
