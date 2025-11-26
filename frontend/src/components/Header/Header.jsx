import React from "react";
import headerImage from "@/assets/header.png";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <div className="hero bg-base-200 min-h-[50vh]">
      <div className="hero-content flex-col ">
        <div className=" flex justify-center max-md:flex-col items-center">
          <h1 className="text-5xl font-bold text-primary">TechConf</h1>
          <div className="w-1 border-l-2 border-2 border-l-primary h-[150px] mx-4 max-md:hidden"></div>
          <div className="w-full max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
            <div className="max-md:text-center">
              <p className="py-2 text-3xl font-bold ">
                Get the latest update on Tech Events.
              </p>
              <p className="font-bold">Build Network | Grow your Career</p>
              
            </div>
            <Link href="/events" className="btn btn-primary max-md:mx-auto mt-4">
                Browse Events
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
