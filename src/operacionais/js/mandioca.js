import React, { useState, useEffect } from "react";
import "./../css/mandioca.css";
import Header from "./header";
// import { RadioButton } from "primereact/radiobutton";
import add_lista from "./../../svgs/add_lista.svg";
import download_selec from "./../../svgs/download_selec.svg";
import selec_all from "./../../svgs/selec_all.svg";
import playlist_add from "./../../svgs/playlist_add.svg";
import playlist_add_check from "./../../svgs/playlist_add_check.svg";
import get_app from "./../../svgs/get_app.svg";
import cicle from "./../../svgs/cicle.svg";
import cicle_preenchido from "./../../svgs/cicle_preenchido.svg";
import JK from "./../../svgs/JK.svg";

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

// const Post = (obra, code, nome) => {
//   const params = {
//     obra: obra,
//     code: code,
//     nome: nome,
//   };
//   const options = {
//     method: "POST",
//     body: JSON.stringify(params),
//   };
//   fetch("https://DotingMeaslyAstronomy.wayukier.repl.co/api/listas", options)
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response);
//     });
// };

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
    if (!playlist) {
      const reus = await Post(props.obra, props.code, props.nome);
      setIdNovo(reus);
      console.log("AlteraPlaylistAdd adicionar pressionado!");
      setPlaylist(!playlist);
    } else {
      Delete(idNovo, props.nome);
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
          src={playlist ? playlist_add_check : playlist_add}
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

const Everything = () => {
  const [users, setUsers] = useState([]);
  const [obra, setObra] = useState("");
  const [code, setCode] = useState("");
  const [nome, setNome] = useState("");
  const [url, setUrl] = useState(
    "https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas?obra=Angel%20Beats!"
  );
  const [estado, setEstado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome) {
      console.log("Legal, temos um nome!");
      setUrl(
        `https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas/nome/${nome}`
      );
      // setEstado("[ATENÇÃO] Buscando por Música");
    } else if (code) {
      console.log("Legal temos um código yeh");
      setUrl(
        `https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas/code/${code}`
      );
      // setEstado("[ATENÇÃO] Buscando por ID");
    } else if (obra) {
      console.log("Legal temos uma obra! YEHHH");
      if (obra === "*") {
        setUrl(`https://dotingmeaslyastronomy.wayukier.repl.co/api/m`);
      } else {
        setUrl(
          `https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas?obra=${obra}`
        );
      }
      // setEstado("[ATENÇÃO] Buscando por Obra");
      console.log(url);
    } else {
      console.log("Vish, não sei o que temos! Então vou colocar Angel Beats!");
      setUrl(
        "https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas?obra=Angel%20Beats!"
      );
      // setEstado("[ATENÇÃO] Falha na entrada! Exibindo Angel Beats!");
    }
    // Após pesquisar todos os campos são limpos, para se preparar para próxima pesquisa
    setNome("");
    setCode("");
    setObra("");
  };

  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
    console.log(users);
  };

  useEffect(() => {
    getUsers();
  }, [url]);

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <h1 className="titulo">[BUSCAR]</h1>
        <div className="Obra">
          <label htmlFor="Obra">Obra</label>
          <input
            type="text"
            id="Obra"
            value={obra}
            placeholder="Angel Beats!"
            onChange={(event) => setObra(event.target.value)}
          ></input>
        </div>
        <div className="Secundario">
          <div className="ID">
            <label htmlFor="ID">ID</label>
            <input
              type="text"
              id="ID"
              value={code}
              placeholder="33300"
              onChange={(event) => setCode(event.target.value)}
            ></input>
          </div>
          <div className="Musica">
            <label htmlFor="Música">Música</label>
            <input
              type="text"
              id="Música"
              value={nome}
              placeholder="Ichiban no Takaramono (Yui version) (ED2)"
              onChange={(event) => setNome(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="inferior">
          <h3>{estado}</h3>
          <button type="submit" className="btn">
            BUSCAR
          </button>
        </div>
      </form>
      <Lista vetor={users} />
      <img src={JK} className="animegirl" />
    </>
  );
};

export default Everything;
