import React, { useState, useEffect } from "react";
import Header from "../operacionais/js/header";
import "../operacionais/css/mandioca.css";
import playlist_add from "./../svgs/playlist_add.svg";
import get_app from "./../svgs/get_app.svg";
import cicle from "./../svgs/cicle.svg";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const Listaa = () => {
  const [url, setUrl] = useState(
    "https://DotingMeaslyAstronomy.wayukier.repl.co/api/l"
  );
  const [listinha, setListinha] = useState([]);

  const ItemLista = (props) => {
    const handlePlaylistAdd = () => {};
    const handleGetApp = () => {};
    const handleCicle = () => {};

    return (
      <>
        <h3 id="nome_lista">{props.nome}</h3>
        <h4 id="code_lista">{props.code}</h4>
        <h4 id="obra_lista">{props.obra}</h4>
        <div className="opcao">
          <img src={playlist_add} onClick={() => handlePlaylistAdd(props.id)} />
          <img
            src={get_app}
            id="get_app_lista"
            onClick={() => handleGetApp(props.id)}
          />
          <img
            src={cicle}
            id="get_cicle"
            onClick={() => handleCicle(props.id)}
          />
        </div>
      </>
    );
  };

  const Lista = (props) => {
    const { vetor } = props;
    console.log("Entrou em lista");
    return (
      <ul className="lista">
        {vetor.map((user) => {
          const { _id, obra, code, nome } = user;
          return (
            <>
              <li key={_id} className="itemLista">
                <ItemLista id={_id} obra={obra} code={code} nome={nome} />
              </li>
            </>
          );
        })}
      </ul>
    );
  };

  const getLista = async () => {
    const resposta = await fetch(url);
    const itens = await resposta.json();
    setListinha(itens);
    console.log(itens);
  };

  useEffect(() => {
    getLista();
  }, []);

  return (
    <>
      <Header />
      <Lista vetor={listinha} />
    </>
  );
};

export default Listaa;
