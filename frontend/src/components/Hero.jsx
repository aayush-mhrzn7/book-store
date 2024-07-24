import React from "react";

function Hero() {
  return (
    <div className="flex font-primary justify-center items-center">
      <div>
        <h1 className="text-5xl my-2">Find new reads</h1>
        <p className="text-xl my-3 ">
          Welcome to our store here you can buy new captivating books to read
          based on different genres
        </p>
      </div>
      <div className="">
        <img
          src="https://illustrations.popsy.co/white/studying.svg"
          alt="images"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}

export default Hero;
