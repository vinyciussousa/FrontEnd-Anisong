import React, { useState, useEffect } from "react";
import "./list.css";
import add_lista from "./svgs/add_lista.svg"
import download_selec from "./svgs/download_selec.svg"
import selec_all from "./svgs/selec_all.svg"
import playlist_add from "./svgs/playlist_add.svg"
import get_app from "./svgs/get_app.svg"
import cicle from "./svgs/cicle.svg"

const url = "https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas?obra=Ore no Imouto ga Konna ni Kawaii Wake ga Nai";

const Busca = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
    console.log(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="caixa">
			<div className="opcoes">
      	<img src={add_lista} alt='adicionar a lista' className="svg"/>
        <img src={download_selec} alt='baixar os selecionados' className="svgC"/>
        <img src={selec_all} alt='selecionar a lista' className="svg"/>
			</div>
			<div className="resultados">
				<ul className="users">
					{users.map((user) => {
						const { _id, obra, code, nome } = user;
						return (
							<li key={_id} className="elemento">
								<h3 className="nome">{nome}</h3>
								<h4 className="code">{code}</h4>
								<h4 className="obra">{obra}</h4>
								<img src={playlist_add} alt="adicionar a playlist"/>
								<img src={get_app} alt="baixar musica"/>
								<img src={cicle} alt="selecionar musica"/>
							</li>
						);
					})}
				</ul>
			</div>
    </div>
  );
};

export default Busca;