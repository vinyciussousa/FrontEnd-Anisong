import React, { useState, useEffect } from "react";
import Header from "../operacionais/js/header";
import "../operacionais/css/mandioca.css";
// import add_lista from "./../svgs/add_lista.svg";
import download_selec from "./../svgs/download_selec.svg";
import selec_all from "./../svgs/selec_all.svg";
import playlist_add from "./../svgs/playlist_add.svg";
import playlist_add_check from "./../svgs/playlist_add_check.svg";
import get_app from "./../svgs/get_app.svg";
import cicle from "./../svgs/cicle.svg";
import cicle_preenchido from "./../svgs/cicle_preenchido.svg";
import download_tudo from "./../svgs/Frame17.svg";
import remover_tudo from "./../svgs/bt.svg";

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
    // alert(`${nome} adicionado à lista`);
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
    // alert(`${nome} removido da lista`);
  } catch (err) {
    console.log(err);
    alert(`Houve um problema ao remover ${nome} da lista`);
  }
};

const Listaa = () => {
  // const [url, setUrl] = useState(
  // "https://DotingMeaslyAstronomy.wayukier.repl.co/api/l"
  // );
  const url = "https://DotingMeaslyAstronomy.wayukier.repl.co/api/l";
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
        Delete(idNovo || props.id, props.nome);
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

    const selecion2 = () => {
      // console.log("Entrou em selecion");
      try {
        if (props.play) {
          setPlaylist(true);
        } else {
          setPlaylist(false);
        }
      } catch (err) {
        setPlaylist(false);
      }
    };

    useEffect(() => selecion(), [props.sel]);
    useEffect(() => selecion2(), [props.play]);

    return (
      <>
        <h3 id="nome_lista">{props.nome}</h3>
        <h4 id="code_lista">{props.code}</h4>
        <h4 id="obra_lista">{props.obra}</h4>
        <div className="opcao">
          <img
            src={playlist ? playlist_add : playlist_add_check}
            alt="playlist"
            onClick={() => handlePlaylistAdd(props.id)}
          />
          <img
            src={get_app}
            alt="get_app"
            id="get_app_lista"
            onClick={() => handleGetApp(props.id)}
          />
          <img
            src={circulo ? cicle_preenchido : cicle}
            alt="circulo"
            id="get_cicle"
            onClick={() => handleCicle(props.obra, props.code, props.nome)}
          />
        </div>
      </>
    );
  };

  const Lista = (props) => {
    const [selecionarTudo, setSelecionarTudo] = useState(false);
    const [playlistTudo, setPlaylistTudo] = useState(false);
    const [selecionadoss, setSelecionadoss] = useState([]);
    const { vetor } = props;

    const removeLista = () => {
      console.log("Entrou em remover Lista");
      try {
        console.log("entrou no try");
        console.log(selecionadoss);
        if (typeof selecionadoss == typeof []) {
          selecionadoss.map((unidade) => {
            const { _id, nome } = unidade;
            Delete(_id, nome);
            return null;
          });
          setSelecionadoss([]);
          console.log("tudo deselecionado");
          setSelecionarTudo(false);
          setPlaylistTudo(true);
          alert(`Tudo removido!`);
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
            return null;
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
        <div className="opcs opcs2">
          <img
            src={remover_tudo}
            alt="remover_tudo"
            onClick={() => removeLista()}
          />
          <img src={download_selec} alt="ds" />
          <img src={download_tudo} alt="dt" />
          <img src={selec_all} alt="sa" onClick={() => selecionar()} />
        </div>
        <ul className="lista">
          {vetor.map((user) => {
            const { _id, obra, code, nome } = user;
            return (
              <>
                <li className="itemLista" key={_id}>
                  <ItemLista
                    id={_id}
                    obra={obra}
                    code={code}
                    nome={nome}
                    sel={selecionarTudo}
                    play={playlistTudo}
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
      <div className="listaFolder">
        <h1 className="titulo">[LISTA]</h1>
      </div>
      <Lista vetor={listinha} />
    </>
  );
};

export default Listaa;
