import React, { useState } from "react";
import "./App.css";
import Header from "./header";
import Lista from "./list";
import animegirl from "./svgs/animegirl.svg"
// import api from './api';

function App() {
  const [name, setName] = useState([]);
  const [pera, setPera] = useState([]);

  const api = async () => {
    try {
      console.log("Entrou na api");
      const response = await fetch(
        "https://DotingMeaslyAstronomy.wayukier.repl.co/api/musicas?obra=Jujutsu%20Kaisen"
      );
      const data = await response.json();
      setPera(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    const batata = api();
    setPera(batata);
  };

  return (
    <div>
      <Header className="header" />
      <form id="buscar_form" onSubmit={handleSubmit}>
        <h3 className="Buscar">[BUSCAR]</h3>
        <div className="form-control">
          <label htmlFor="tipo1">Obra </label>
          <br />
          <input
            type="text"
            id="tipo1"
            className="texto"
            placeholder={pera}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <div className="menor">
            <div className="divID">
              <label htmlFor="tipo1">ID </label>
              <br />
              <input
                type="text"
                id="tipo1"
                className="id"
                placeholder={pera}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div className="divMusica">
              <label htmlFor="tipo1">Música </label>
              <br />
              <input
                type="text"
                id="tipo1"
                className="musica"
                placeholder={pera}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
					<div className="divEnviar">
          	<br />
          	<input
            	type="submit"
            	id="Enviar"
            	className="Enviar"
            	value="Buscar"
          	></input>
					</div>
        </div>
      </form>
      <br />
      <Lista />
			<div  className="animegirl">
				<img src={animegirl} alt="animegirl"/>
			</div>
    </div>
  );
}

export default App;
