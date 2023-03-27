import React from "react";
import GithubIcon from "../assets/github.png";
import DiscordIcon from "../assets/discord.png";
import MetaIcon from "../assets/meta.png";
import { NavLink } from "react-router-dom";

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <footer className="flex flex-col bg-y-bg py-6 ">
      <div className="flex justify-center gap-2">
        <NavLink>
          <img className="h-8 w-8"src={GithubIcon} alt="github logo" />
        </NavLink>
        <NavLink>
          <img className="w-8 h-8" src={DiscordIcon} alt="discord logo" />
        </NavLink>
        <NavLink>
          <img className="w-8 h-8" src={MetaIcon} alt="meta logo" />
        </NavLink>
      </div>
      <div className="flex gap-4 justify-center">
        <p>&copy; ManyNotes {year}</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
