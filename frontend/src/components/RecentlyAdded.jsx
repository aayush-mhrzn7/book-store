import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
function RecentlyAdded() {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(` ${config.backendUrl}/recently-added`);

      setRecentlyAdded(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className=" mb-40 font-primary">
      <div className="my-4">
        <h4 className="text-3xl my-4 font-semibold">Recently added</h4>
        <div className="grid mt-10 xl:grid-cols-4 gap-10 grid-cols-2 max-sm:grid-cols-1 ">
          {recentlyAdded?.map((book, index) => (
            <div
              onClick={() => {
                navigate(`/book/${book._id}`);
              }}
              className="w-full cursor-pointer hover:scale-110 transition-all  p-7 object-cover object-top border-2 shadow-md rounded-lg"
              key={index}
            >
              <div className="w-full">
                <img
                  src={book.url}
                  className="object-cover h-80 w-full rounded-lg mb-4 "
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-xl capitalize font-semibold">
                  {book.title}
                </h1>
                <p>
                  {book.description.length > 90
                    ? book.description.slice(0, 90) + "..."
                    : null}
                </p>
                <button className="px-3 py-2 w-full bg-blue-300 rounded-lg my-3">
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

export default RecentlyAdded;
