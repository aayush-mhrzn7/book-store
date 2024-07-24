import React from "react";
import Hero from "../components/Hero";
import RecentlyAdded from "../components/RecentlyAdded";

function Home() {
  return (
    <div className="h-[90vh] w-full flex flex-col justify-center py-8 px-7">
      <Hero />
    </div>
  );
}

export default Home;