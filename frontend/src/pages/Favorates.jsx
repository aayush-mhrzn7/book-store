import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";

function Favorates() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${config.backendUrl}all-favorate`, {
        withCredentials: true,
      });
      console.log(response);
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div>
      <h1>All your favorite Books</h1>
    </div>
  );
}

export default Favorates;
