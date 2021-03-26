import React, { useState, useEffect } from "react";
import Header from "../operacionais/js/header";
import "../operacionais/css/mandioca.css";
import add_lista from "./../svgs/add_lista.svg";
import download_selec from "./../svgs/download_selec.svg";
import selec_all from "./../svgs/selec_all.svg";
import playlist_add from "./../svgs/playlist_add.svg";
import playlist_add_check from "./../svgs/playlist_add_check.svg";
import get_app from "./../svgs/get_app.svg";
import cicle from "./../svgs/cicle.svg";
import cicle_preenchido from "./../svgs/cicle_preenchido.svg";

const Post = async (obra, code, nome) => {
  try {
    const rawResponse = await fetch(
      "https://DotingMeaslyAstronomy.wayukier.repl.co/api/listas",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          obra: obra,
          code: code,
          nome: nome,
        }),
      }
    );
    // const content = await rawResponse.json();
    const resulta = await rawResponse.json();
    console.log(resulta);
    alert(`${nome} adicionado à lista`);
    return resulta._id;
  } catch (err) {
    console.log(err);
    alert(`Houve um problema ao adicionar ${nome} à lista`);
  }
};

const Delete = async (id, nome) => {
  try {
    const rawResponse = await fetch(
      `https://DotingMeaslyAstronomy.wayukier.repl.co/api/listas/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const content = await rawResponse.json();
    console.log(content);
    alert(`${nome} removido da lista`);
  } catch (err) {
    console.log(err);
    alert(`Houve um problema ao remover ${nome} da lista`);
  }
};

const Listaa = () => {
  const [url, setUrl] = useState(
    "https://DotingMeaslyAstronomy.wayukier.repl.co/api/l"
  );
  const [listinha, setListinha] = useState([]);

  const ItemLista = (props) => {
    const [idNovo, setIdNovo] = useState("");
    const [circulo, setCirculo] = useState(false);
    const [playlist, setPlaylist] = useState(false);

    // const [download, setDownload] = useState(false);

    const handlePlaylistAdd = () => {
      alteraPlaylistAdd();
    };
    const handleGetApp = () => {
      alteraGetApp();
    };
    const handleCicle = () => {
      alteraCicle();
    };
    const alteraCicle = () => {
      console.log("AlteraCicle pressionado!");
      setCirculo(!circulo);
    };
    const alteraPlaylistAdd = async () => {
      if (playlist) {
        const reus = await Post(props.obra, props.code, props.nome);
        setIdNovo(reus);
        console.log("AlteraPlaylistAdd adicionar pressionado!");
        setPlaylist(!playlist);
      } else {
        Delete(props.id, props.nome);
        console.log("AlteraPlaylistAdd remover pressionado!");
        setPlaylist(!playlist);
      }
    };
    const alteraGetApp = () => {
      console.log("AlteraGetApp pressionado!");
      // setDownload(!download);
    };
    const selecion = () => {
      // console.log("Entrou em selecion");
      try {
        if (props.sel) {
          setCirculo(true);
        } else {
          setCirculo(false);
        }
      } catch (err) {
        setCirculo(false);
      }
    };

    useEffect(() => selecion(), [props.sel]);

    return (
      <>
        <h3 id="nome_lista">{props.nome}</h3>
        <h4 id="code_lista">{props.code}</h4>
        <h4 id="obra_lista">{props.obra}</h4>
        <div className="opcao">
          <img
            src={playlist ? playlist_add : playlist_add_check}
            onClick={() => handlePlaylistAdd(props.id)}
          />
          <img
            src={get_app}
            id="get_app_lista"
            onClick={() => handleGetApp(props.id)}
          />
          <img
            src={circulo ? cicle_preenchido : cicle}
            id="get_cicle"
            onClick={() => handleCicle(props.obra, props.code, props.nome)}
          />
        </div>
      </>
    );
  };

  const Lista = (props) => {
    const [selecionarTudo, setSelecionarTudo] = useState(false);
    const [selecionadoss, setSelecionadoss] = useState([]);
    const { vetor } = props;

    const enviarLista = () => {
      console.log("Entrou em enviar Lista");
      try {
        console.log("entrou no try");
        console.log(selecionadoss);
        if (typeof selecionadoss == typeof []) {
          selecionadoss.map((unidade) => {
            const { _id, obra, code, nome } = unidade;
            Post(obra, code, nome);
          });
          setSelecionadoss([]);
          console.log("tudo deselecionado");
          setSelecionarTudo(false);
        } else {
          console.log("Não é um tipo Array");
          console.log(selecionadoss);
        }
        console.log("saiu do try");
      } catch (err) {
        console.log(err);
        console.log(selecionadoss);
      }
    };

    const selecionar = () => {
      const frango = [];
      setSelecionarTudo(!selecionarTudo);
      if (!selecionarTudo) {
        console.log("selecionar tudo selecionado");
        try {
          vetor.map((unidade) => {
            // const { _id, obra, code, nome } = unidade;
            // console.log(unidade);
            frango.unshift(unidade);
          });
          setSelecionadoss(frango);
          console.log(selecionadoss);
        } catch (err) {
          console.log("Error em setSelecionados");
        }
      } else {
        console.log("selecionar tudo deselecionado");
        setSelecionadoss([]);
      }
    };

    return (
      <>
        <div className="opcs">
          <img src={add_lista} onClick={() => enviarLista()} />
          <img src={download_selec} id="ds" />
          <img src={selec_all} onClick={() => selecionar()} />
        </div>
        <ul className="lista">
          {vetor.map((user) => {
            const { _id, obra, code, nome } = user;
            return (
              <>
                <li key={_id} className="itemLista">
                  <ItemLista
                    id={_id}
                    obra={obra}
                    code={code}
                    nome={nome}
                    sel={selecionarTudo}
                  />
                </li>
              </>
            );
          })}
        </ul>
      </>
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
      <h1 className="titulo">[LISTA]</h1>
      <Lista vetor={listinha} />
    </>
  );
};

export default Listaa;
