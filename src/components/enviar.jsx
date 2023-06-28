import React, { useState } from "react";
import axios from "axios";



function Enviar({ arquivos }) {
  const [empresaSelecionada, setEmpresaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");


  const handleEmpresaChange = (event) => {
    setEmpresaSelecionada(event.target.value);
  };

  const handleModeloChange = (event) => {
    setModeloSelecionado(event.target.value);
  };
  const enviarParaArgus = (empresaSelecionada) => {
    const endpoint = "https://apioci.argus.app.br:23243/apiargus/"+empresaSelecionada+"/uploadmailing";
    const token = "oLbJS3hu6s2tquHTFAFMUwwEL9KKTXw28d3QzJ4AX4AYDxUN6uHP30gIEAAsECMM";
  
    // Crie um objeto FormData para enviar os dados do formulário
    const formData = new FormData();
    formData.append("empresa", empresaSelecionada);
  
    // Adicione os arquivos selecionados ao FormData
    arquivos.forEach((arquivo) => {
      formData.append("arquivos[]", arquivo.file);
    });
  
    // Faça a chamada à API usando o axios
    axios
      .post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "token-signature": token
        }
      })
      .then((response) => {
        // Manipule a resposta da API conforme necessário
        console.log(response.data);
        // Exiba uma mensagem de sucesso ou faça outras ações
  
        // Limpe o formulário ou redefina os estados, se necessário
        setEmpresaSelecionada("");
        setModeloSelecionado("");
      })
      .catch((error) => {
        // Manipule o erro da API conforme necessário
        console.error(error);
        // Exiba uma mensagem de erro ou faça outras ações
      });
  };
  
  const handleEnviarClick = () => {
    if (isFormValid) {
      // Chamar a função externa para enviar para o Argus
      enviarParaArgus(empresaSelecionada);
    }
  };

  const isFormValid = empresaSelecionada !== "" && modeloSelecionado !== "";

  return (
    <>
      <div className="container mt-10">
        <form action="">
          <div className="row">
            <div className="col-6">
              <h3>Empresa</h3>
              {/* Lista de nomes de arquivos */}
              <select
                name="empresa-argus"
                id="argus-sl"
                className="form-select bg-dark"
                style={{ color: "white" }}
                value={empresaSelecionada}
                onChange={handleEmpresaChange}
                required
              >
                <option value="" disabled>
                  Selecione uma sala...
                </option>
                <option value="vieiracred_sl1">Vieiracred - Matriz</option>
                <option value="vieiracred_sl3">Parceiros</option>
              </select>
            </div>
            <div className="col-6">
              <h3>Modelo Argus</h3>
              {/* Lista de nomes de arquivos */}
              <select
                name="modelo-argus"
                id="argus-sl"
                className="form-select bg-dark"
                style={{ color: "white" }}
                value={modeloSelecionado}
                onChange={handleModeloChange}
                required
              >
                <option value="" disabled>
                  Selecione um modelo...
                </option>
                <option value="novaTela">Nova Tela</option>
                <option value="port_inicial">Portabilidade</option>
              </select>
            </div>
            <div className="col-15">
              <br />
              <h3>Bases</h3>
              {/* Checkboxes para selecionar arquivos */}
              {arquivos.map((arquivo, index) => (
                <div className="input-group mb-3" key={index}>
                  <div
                    className="input-group-text"
                    style={{ backgroundColor: "#1a1b1c" }}
                  >
                    <input
                      className="form-check-input mt-0 "
                      type="checkbox"
                      value=""
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control bg-dark"
                    aria-label="Text input with checkbox"
                    value={arquivo.name}
                    style={{ color: "white" }}
                    readOnly
                  />
                </div>
              ))}
            </div>
            <div className="col-5">
              <button
                className="btn btn-outline-success"
                type="button"
                id="inputGroupFileAddon04"
                onClick={handleEnviarClick}
                disabled={!isFormValid}
              >
                Enviar para o Argus
              </button>

              <div>
                <br />
                {/* {mostrarPopup && (
                  <Popup
                    onClose={handleClosePopup}
                    onConfirm={handleConfirmarEnviar}
                    isPasswordCorrect={mostrarPopup}
                  />
                )} */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Enviar;
