import React, { useState } from "react";




function Popup({ onClose, onConfirm, isPasswordCorrect }) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar se a senha está correta
    if (password === "1234") {
      // Chamar a função ou executar a ação desejada aqui
      console.log("Função chamada");
      onConfirm();
      setErrorMessage("");
    } else {
      setErrorMessage("Senha incorreta");
    }
  };

 
  

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Informe a senha</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Enviar</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Popup;
