import React from "react";
import Header from "../operacionais/js/header";
import "../operacionais/css/mandioca.css";
import Nurse from "./../svgs/nurse.svg";

const downloads = () => {
  return <>
		<Header />
		<div className="downloadsFolder">
			<div className="downloadsTextos">
				<h1 className="titulo">[This page is under care.]</h1>
				<h2 className="subtitulo">[Please return soon.]</h2>
			</div>
			<img src={Nurse} alt= "Nurse" className="Nurse" />
		</div>
	</>;
};

export default downloads;
