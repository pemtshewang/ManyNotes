import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import LogoutDialog from "../src/components/LogoutDialog";

const UserNotePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = React.useState(false);
  return (
    <main className="bg-y-bg h-screen">
      {isLogoutDialogOpen && (
        <LogoutDialog
          isOpen={isLogoutDialogOpen}
          setIsOpen={setIsLogoutDialogOpen}
        />
      )}
      <nav className="flex pt-5 pl-5 h-5">
        <NavLink to="/">
          <div className="flex flex-col ">
            <div className="font-raleway text-2xl font-black">Many</div>
            <div className="font-raleway text-2xl font-black">Notes</div>
          </div>
        </NavLink>
        <div className="ml-auto py-5 px-9 profile-drop">
          <div class="avatar placeholder">
            <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
              {/* insert here */}
              <div class="avatar placeholder">
                <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span>MX</span>
                </div>
              </div>
              {/* <span class="text-xs">{user.name}</span> */}
            </div>
          </div>
          <div className=" border-2 border-black flex flex-col px-4 py-3 mt-3 w-max">
            <NavLink className="hover:underline hover:text-red-500 font-raleway">
              Edit My Profile
            </NavLink>
            <NavLink
              className="hover:underline hover:text-red-500 font-raleway"
              onClick={() => setIsLogoutDialogOpen(true)}
            >
              Logout
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="container m-0">
        <div className="flex flex-col items-center p-5">
          <h2 className="font-raleway text-black font-semibold text-xl tracking-wider">
            You dream, you aim and you achieve.
          </h2>
          <p className="font-raleway text-black font-semibold">
            <i>Pem Tshewang</i>
          </p>
        </div>
        <div className="note-container container mx-auto border-4 border-black p-3">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default UserNotePage;
