import React from "react";
import "./header.css";
import searchIcon from "./svgs/search.svg";
import listIcon from "./svgs/list_alt.svg";
import cloudIcon from "./svgs/cloud_download.svg";
import stormtrooperIcon from "./svgs/Stormtrooper.svg";
import settingsIcon from "./svgs/Settings.svg";
function Header() {
  return (
    <header>
      <div className="frame5">
        <div className="frame3">
          <img src={searchIcon} alt="buscar" />
          <img src={listIcon} alt="lista" />
          <img src={cloudIcon} alt="downloads" />
        </div>
        <div className="frame4">
          <img src={stormtrooperIcon} alt="stormtrooper" />
          <img src={settingsIcon} alt="config" />
        </div>
      </div>
    </header>
  );
}

export default Header;
