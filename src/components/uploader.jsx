import React, { useState } from "react";
import Tabela from "./Tabela";
import Enviar from "./Enviar";
import Popup from "./auth";

function Uploader() {
  const [arquivos, setArquivos] = useState([]);
  const [mostrarIframe, setMostrarIframe] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const handleUpload = (event) => {
    const files = event.target.files;
    setArquivos(Array.from(files));
  };

  const handleAbrirIframe = () => {
    setMostrarIframe(true);
  };

  const handleAbrirPopup = () => {
    setMostrarPopup(true);
  };

  const handleClosePopup = () => {
    setMostrarPopup(false);
  };

  const handleConfirmarEnviar = () => {
    // Lógica para enviar para o Argus
    console.log("Enviar para o Argus");
    setMostrarPopup(false);
  };

  
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Upload de Mailing</h1>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="input-group ">
              <input
                type="file"
                accept=".csv"
                className="form-control bg-dark"
                style={{ color: "whitesmoke" }}
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                placeholder="Selecione um ou mais arquivos"
                onChange={handleUpload}
                multiple
              />
            </div>
          </div>
          <div className="col-6">
            <button
              className="btn btn-outline-success float-end"
              type="button"
              id="inputGroupFileAddon04"
              onClick={handleAbrirIframe}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <br />
            <Tabela arquivos={arquivos} />
          </div>
        </div>
      </div>
      <br />
      {mostrarIframe && (
        <div className="iframe-overlay">
          <div className="iframe-container">
            <button
              className="close-button"
              aria-label="Mute"
              onClick={() => setMostrarIframe(false)}
            >
              <i className="bi bi-x-circle-fill" style={{ fontSize: "24px" }}></i>
            </button>

            <div className="container">
              <Enviar arquivos={arquivos} onAbrirPopup={handleAbrirPopup} />
            </div>
          </div>
        </div>
        
      )}

      {mostrarPopup && (
        <Popup onClose={handleClosePopup} onConfirm={handleConfirmarEnviar} />
      )}
    </>
  );
}

export default Uploader;
