import React from "react";
import "../css/header.css";
import searchIcon from "../../svgs/search.svg";
import listIcon from "../../svgs/list_alt.svg";
import cloudIcon from "../../svgs/cloud_download.svg";
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
      <div className="guia">
        <div className="items-guia">
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
      </div>
    </header>
  );
}

export default Header;
