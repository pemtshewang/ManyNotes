import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const UserNotePage = () => {
  return (
    <main className="bg-y-bg h-screen">
      <nav className="flex pt-5 pl-5">
        <NavLink to="/">
          <div className="flex flex-col ">
            <div className="font-raleway text-2xl font-black">Many</div>
            <div className="font-raleway text-2xl font-black">Notes</div>
          </div>
        </NavLink>
        <div className="ml-auto py-5 px-9">UserSession</div>
      </nav>
      <div className="container">
        <div className="flex flex-col items-center p-10">
          <h2 className="font-raleway text-black font-semibold text-xl tracking-wider">
            You dream, you aim and you achieve.
          </h2>
          <p className="font-raleway text-black font-semibold">
            <i>Pem Tshewang</i>
          </p>
        </div>
        <div className="container mx-auto w-max border-4 border-black p-5">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default UserNotePage;
