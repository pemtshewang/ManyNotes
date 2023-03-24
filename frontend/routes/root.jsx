import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="container px-8">
      <Outlet />
    </div>
  );
};

export default Root;
