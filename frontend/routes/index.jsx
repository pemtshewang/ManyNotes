import React from "react";
import { Link } from "react-router-dom";
import Logo from "../src/assets/landinglogo.png";
import Book from "../src/assets/book.png";
import Features from "../src/components/features";


const Index = () => {
  return (
    <main className="bg-y-bg h-screen">
      <nav className="flex pt-5 pl-5">
        <div className="flex flex-col ">
          <div className="font-raleway text-2xl font-black">Many</div>
          <div className="font-raleway text-2xl font-black">Notes</div>
        </div>
        <div className="ml-auto mr-8">
          <Link
            to="/"
            className="text-black hover:text-red-500 px-3 py-2 rounded-md text-base font-raleway font-semibold"
          >
            About
          </Link>
          <Link
            to="/"
            className="text-black hover:text-red-500 px-3 py-2 rounded-md text-base font-raleway font-semibold"
          >
            Support Dev
          </Link>
          <Link
            to="/"
            className="text-black hover:text-red-500 px-3 py-2 rounded-md text-base font-raleway font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      <div className="grid grid-cols-2 bg-y-bg">
        <div>
          <div className="flex flex-col pt-10">
            <div className=" h-3/5 w-3/5 mx-auto">
              <img src={Logo} alt={"image of cat"} />
            </div>
            <div className="mx-auto py-5">
                <p className="text-xl font-raleway font-light">Never lose a note again with ManyNotes</p>
            </div>
          </div>
        </div>
        <div className="w-3/5 ml-auto">
          <img src={Book} alt={"image of book"} />
        </div>
      </div>
      <Features />
    </main>
  );
};

export default Index;
