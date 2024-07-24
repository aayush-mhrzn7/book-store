import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
function Navbar() {
  const status = useSelector((state) => state.auth.status);
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
  ];
  const navigate = useNavigate();

  return (
    <>
      <nav
        className={`shadow-xl z-50  font-primary py-3 px-10 relative flex justify-between items-center`}
      >
        <div className="flex items-center font-semibold text-2xl justify-center">
          <Link to="/">Kitab</Link>
        </div>
        <div className="nav-links flex gap-4 justify-center items-center  ">
          <div className=" flex gap-4 justify-center items-center">
            {Links.map((item, index) =>
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

          {/*   <button className="">
            <GiHamburgerMenu />
          </button> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
