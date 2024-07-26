import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";
import config from "../config";
function Navbar() {
  const status = useSelector((state) => state.auth.status);
  const payload = useSelector((state) => state.auth.data?.role);
  console.log(payload);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (payload != "admin") {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, [payload]);
  console.log(status);
  const Links = [
    {
      name: "Home",
      slug: "/",
      active: status,
    },

    {
      name: "All books",
      slug: "/all-books",
      active: status,
      admin: admin,
    },
    {
      name: "favorates",
      slug: "/favorates",
      active: status,
    },
    {
      name: "cart",
      slug: "/cart",
      active: status,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: status,
    },

    {
      name: "Add-book",
      slug: "/add-book",
      admin: admin,
    },
    {
      name: "dashboard",
      slug: "/dashboard",
      admin: admin,
    },
  ];

  const navigate = useNavigate();
  const deleteSesssion = async () => {
    await axios.patch(`${config.backendUrl}logout`);
  };
  return (
    <>
      <nav
        className={`shadow-xl z-50  bg-white font-primary py-3 px-10 relative flex justify-between items-center`}
      >
        <div className="flex items-center font-semibold text-2xl justify-center">
          <Link to="/">Kitab</Link>
        </div>
        <div className="nav-links flex gap-4 justify-center items-center  ">
          <div className=" flex gap-4 justify-center items-center">
            {admin
              ? Links.map((item, index) =>
                  item.admin ? (
                    <Link
                      key={index}
                      to={item.slug}
                      className=" hover:text-blue-500 font-semibold text-xl cursor-pointer  transition-all list-none capitalize"
                    >
                      {item.name}
                    </Link>
                  ) : null
                )
              : Links.map((item, index) =>
                  item.active ? (
                    <Link
                      key={index}
                      to={item.slug}
                      className=" hover:text-blue-500 font-semibold text-xl cursor-pointer  transition-all list-none capitalize"
                    >
                      {item.name}
                    </Link>
                  ) : null
                )}
          </div>

          {status ? null : (
            <div className="flex gap-4">
              <button
                className=" py-2 font-semibold text-xl "
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
              <button
                className=" py-2 font-semibold text-xl"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )}
          <button
            className="hover:text-blue-500 font-semibold text-xl cursor-pointer  transition-all list-none capitalize"
            onClick={() => deleteSesssion()}
          >
            logout
          </button>
          {/*   <button className="">
            <GiHamburgerMenu />
          </button> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
