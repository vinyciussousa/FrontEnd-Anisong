import React, { useState, useEffect } from "react";
import Header from "../operacionais/js/header";
import "../operacionais/css/mandioca.css";
import playlist_add from "./../svgs/playlist_add.svg";
import get_app from "./../svgs/get_app.svg";
import cicle from "./../svgs/cicle.svg";
import { isVariableDeclarator } from "@babel/types";

const getLocalStorage = () => {
	console.log("Entrei em getLocalStorage")
  let selCicle = localStorage.getItem('selCicle');
  if (selCicle) {
    return JSON.parse(localStorage.getItem('selCicle'));
  } else {
    return [];
  }
};

const ItemLista = (props) => {
	console.log("Entrei em ItemLista")
  const [selCicle, setSelCicle] = useState(getLocalStorage());
  const handlePlaylistAdd = () => {};
  const handleGetApp = () => {};
  const handleCicle = (id) => {
    if (!selCicle.includes(id)) {
      setSelCicle(selCicle.concat(id));
    } else {
      console.log("Ah não você de novo?.... Vou te matar!");
      setSelCicle(
        selCicle.filter((unit) => {
          if (unit !== id) {
            return unit;
          } else {
            console.log(`Removi ${unit} dos selecionados!`);
            // alert(`Removi ${unit} dos selecionados!`);
          }
        })
      );
    }
    console.log(selCicle);
  };

  useEffect(()=>{
    localStorage.setItem('selCicle',JSON.stringify(selCicle))
  },[selCicle])

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
        <img src={cicle} id="get_cicle" onClick={() => handleCicle(props.id)} />
      </div>
    </>
  );
};

const Lista = (props) => {
	console.log("Entrei em Lista")
  const { vetor } = props;
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

const Listaa = () => {
	console.log("Entrei em Listaa")
	const [storage, setStorage] = useState(getLocalStorage());
	const [valor, setValor] = useState([{"_id":"6052c24abc9016023dae7527","obra":"Samurai Champloo","code":"313","nome":"Tsurugi no Mai","__v":0}]);
	const [url, setUrl] = useState("https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas?obra=Naruto");

	const separaUrl = () => {
		console.log("Entrei em separaUrl")
		storage.map((unidade)=>{
			console.log(unidade);
			setUrl(`https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas/id/${unidade}`);
			console.log(`https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas/id/${unidade}`);
		})
	}

  const getMusica = async () => {
	  const Han = fetch(url).then(response => response.json()).then(data => {
			setValor(data)
			console.log("SASI")
			console.log(data)
			console.log("OSU")
			console.log(valor)
		});

  };

	useEffect(()=>{
		separaUrl();
	}, []);

	useEffect(()=>{
		getMusica();
	}, [url]);

  return(
     <>
		 <Header/>
     <h1 className="titulo">[LISTA]</h1>
     <Lista vetor={valor} />
     </>
     );
};

export default Listaa;
