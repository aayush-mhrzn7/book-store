import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FiMinimize } from "react-icons/fi";
import axios from "axios";
import config from "../config";
function Navbar() {
  const status = useSelector((state) => state.auth.status);
  const payload = useSelector((state) => state.auth.data?.role);

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (payload != "admin") {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, [payload]);

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

  const [mobile, setMobile] = useState(false);
  const enableMobileViewing = () => {
    setMobile(!mobile);
  };
  const navigate = useNavigate();
  const deleteSesssion = async () => {
    await axios.patch(`${config.backendUrl}logout`);
  };
  return (
    <nav
      className={`shadow-xl z-50 ${
        mobile ? "h-screen" : null
      }  bg-white font-primary py-3 px-10 relative w-full flex justify-between items-center`}
    >
      <div
        className={`
            ${mobile ? "hidden" : "block"}
          flex items-center font-semibold text-2xl justify-center`}
      >
        <Link to="/" className={`${mobile ? "hidden" : "block"}`}>
          Kitab
        </Link>
      </div>
      <div
        className={`${
          mobile ? "flex-col" : ""
        }flex nav-links   gap-4 justify-center items-center  `}
      >
        <div
          className={`${
            mobile ? "flex-col   " : "sm:flex hidden "
          }   gap-4  justify-center items-center`}
        >
          {admin
            ? Links.map((item, index) =>
                item.admin ? (
                  <Link
                    key={index}
                    to={item.slug}
                    className=" block sm:my-0 my-20 text-2xl hover:text-blue-500 font-semibold sm:text-xl cursor-pointer  transition-all list-none capitalize"
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
                    className="  block sm:my-0 my-20 text-2xl hover:text-blue-500 font-semibold sm:text-xl cursor-pointer  transition-all list-none capitalize"
                  >
                    {item.name}
                  </Link>
                ) : null
              )}
        </div>

        {status ? null : (
          <div className={` flex gap-4 `}>
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
        {status ? (
          <button
            className=" hidden sm:block hover:text-blue-500 font-semibold  text-2xl sm:text-xl cursor-pointer  transition-all list-none capitalize"
            onClick={() => deleteSesssion()}
          >
            logout
          </button>
        ) : null}
        <button
          className={`${
            mobile ? "absolute top-10 right-10" : ""
          } sm:hidden block transition-all`}
          onClick={() => enableMobileViewing()}
        >
          {status ? (
            mobile ? (
              <FiMinimize className="text-2xl" />
            ) : (
              <FiAlignJustify className="text-2xl" />
            )
          ) : null}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
