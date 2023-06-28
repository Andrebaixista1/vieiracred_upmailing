import React from "react";

function Tabela({ arquivos }) {
  function converteTamanhoParaMB(tamanhoEmBytes) {
    const tamanhoEmMB = tamanhoEmBytes / (1024 * 1024);
    return (
      tamanhoEmMB.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + "MB"
    );
  }

  return (
    <>
      <div className="container mt-5">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Linhas</th>
              <th scope="col">Tipo</th>
              <th scope="col">Tamanho (MB)</th>
            </tr>
          </thead>
          <tbody>
            {arquivos.map((arquivo, index) => (
              <tr key={index}>
                <td>{arquivo.name}</td>
                <td>{arquivo.size}</td>
                <td>{arquivo.type}</td>
                <td>{converteTamanhoParaMB(arquivo.size)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tabela;
