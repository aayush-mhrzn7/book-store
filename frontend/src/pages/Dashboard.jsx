import axios, { all } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import config from "../config";

function Dashboard() {
  const [bookData, setBookData] = useState([]);
  const [Order, setOrder] = useState({});
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      const response = await axios.get(`${config.backendUrl}get-orders`, {
        withCredentials: true,
      });
      console.log(response.data.data);
      setBookData(response.data.data);

      setLoader(false);
    };
    fetch();
  }, []);

  const changeStatus = async ({ status, id }) => {
    const response = await axios.patch(
      `${config.backendUrl}update-status`,
      { status, id },
      { withCredentials: true }
    );
    console.log(response);
    setOrder(response.data.order);
  };
  const Change = (e, id) => {
    changeStatus({ status: e.target.value, id: id });
  };
  console.log(Order);
  const bookDataMemoized = useMemo(() => bookData, [bookData]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <table border={4}>
        <thead className="capitalize ">
          <th className="p-3 border-2 border-collapse border-black">sn</th>
          <th className="p-3 border-2 border-collapse border-black">books</th>
          <th className="p-3 border-2 border-collapse border-black">price</th>
          <th className="p-3 border-2 border-collapse border-black">status</th>
          <th className="p-3 border-2 border-collapse border-black">
            Ordered-By
          </th>
          <th className="p-3 border-2 border-collapse border-black">
            Location
          </th>
        </thead>
        <tbody>
          {bookDataMemoized.map((book, index) => (
            <tr className="p-3 border-2 border-collapse border-black mx-3">
              <td className="p-3 border-2 border-collapse border-black">
                {index}
              </td>
              <td className="p-3 border-2 border-collapse border-black">
                {book.book.title}
              </td>
              <td className="p-3 border-2 border-collapse border-black">
                {book.book.price}
              </td>
              <td className="p-3 border-2 border-collapse border-black">
                <select
                  name="status"
                  id="status"
                  onChange={(e) => Change(e, book._id)}
                  value={Order.status}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Sent to Deliver">Sent to Deliver</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="p-3 border-2 border-collapse border-black">
                {book.user.username}
              </td>
              <td className="p-3 border-2 border-collapse border-black">
                {book.user.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
