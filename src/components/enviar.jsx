import React, { useState } from 'react';
import axios from 'axios';

function Enviar({ arquivos }) {
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [arquivoSelecionado, setArquivoSelecionado] = useState('');
  // const [exibirLoading, setExibirLoading] = useState(false); // Nova variável de estado

  const handleEmpresaChange = (event) => {
    setEmpresaSelecionada(event.target.value);
  };

  const handleModeloChange = (event) => {
    setModeloSelecionado(event.target.value);
  };

  const handleArquivoChange = (event) => {
    setArquivoSelecionado(event.target.value);
  };

  const enviarParaArgus = () => {
    const apiLink = 'https://apioci.argus.app.br:23243/apiargus/';
    const tokenSignature = 'oLbJS3hu6s2tquHTFAFMUwwEL9KKTXw28d3QzJ4AX4AYDxUN6uHP30gIEAAsECMM';
    const usuario = 'planejamento';
    const senha = 'vieira@10';
  
    const empresaSelecionada = 'vieiracred_sl1'; // Substitua pelo valor correto
  
    const url = `${apiLink}${empresaSelecionada}/uploadmailing`;
  
    const headers = {
      'Token-Signature': tokenSignature,
      'Usuario': usuario,
      'Password': senha,
    };
  
    const arquivo = arquivos.find((arquivo) => arquivo.name === arquivoSelecionado);
    if (!arquivo) {
      console.error('Arquivo não encontrado');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', arquivo);
  
    // Configuração da requisição
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: formData,
      timeout: 50000,
      agent: { rejectUnauthorized: false }
    };
    
  
    // Envio da requisição usando a API Fetch
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Trate a resposta da API conforme necessário
        console.log(data);
      })
      .catch(error => {
        // Lide com erros de requisição
        console.error(error);
      });
  };
  

  return (
    <>
      <h1>Enviar Arquivos</h1>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-6">
              <h3>Empresa</h3>
              <select
                name="empresa-argus"
                id="argus-sl"
                className="form-select bg-dark"
                style={{ color: 'white' }}
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
              <select
                name="modelo-argus"
                id="argus-model"
                className="form-select bg-dark"
                style={{ color: 'white' }}
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
            <div className="col-12">
              <br />
              <h3>Bases</h3>
              {arquivos.map((arquivo, index) => (
                <div className="input-group mb-3" key={index}>
                  <div
                    className="input-group-text"
                    style={{ backgroundColor: '#1a1b1c' }}
                  >
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      value={arquivo.name}
                      aria-label="Checkbox for following text input"
                      onChange={handleArquivoChange}
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control bg-dark"
                    aria-label="Text input with checkbox"
                    value={arquivo.name}
                    style={{ color: 'white' }}
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
                onClick={enviarParaArgus}
              >
                Enviar para o Argus
              </button>
              {/* {exibirLoading && (
              <iframe
                src="https://example.com/loading" // URL do iframe de carregamento
                title="Loading"
                width="100%"
                height="200px"
              />
            )} */}
              <div>
                <br />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Enviar;
