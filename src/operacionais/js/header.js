import React from "react";
import "../css/header.css";
import searchIcon from "../../svgs/search.svg";
import listIcon from "../../svgs/list_alt.svg";
import cloudIcon from "../../svgs/cloud_download.svg";
import stormtrooperIcon from "../../svgs/Stormtrooper.svg";
import settingsIcon from "../../svgs/Settings.svg";
import { Link } from "react-router-dom";

function Header() {
  const toBuscar = () => {
    return <Link to="/">Eita</Link>;
  };
  const toLista = () => {
    return <Link to="/lista">Eita</Link>;
  };
  const toDownloads = () => {
    return <Link to="/downloads">Eita</Link>;
  };
  return (
    <header>
      <div className="frame5">
        <div className="frame3">
					<div className="item">
          <img src={searchIcon} alt="buscar" onClick={toBuscar} />
          <Link to="/" className="Link">
            Buscar
          </Link>
					</div>
					<div className="item">
          <img src={listIcon} alt="lista" onClick={toLista} />
          <Link to="/lista" className="Link">
            Lista
          </Link>
					</div>
					<div className="item">
          <img src={cloudIcon} alt="downloads" onClick={toDownloads} />
          <Link to="/downloads" className="Link">
            Downloads
          </Link>
					</div>
        </div>
        {/* <div className="frame4">
          <img src={stormtrooperIcon} alt="stormtrooper" />
          <img src={settingsIcon} alt="config" />
        </div> */}
      </div>
    </header>
  );
}

export default Header;
