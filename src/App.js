import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {

    if(input === ''){
      alert("Preencha com algum CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      console.log(response.data)
      setInput("");

    }catch{
      alert("Ops erro ao buscar...\n Digite um CEP válido! \n Obs: O sistema só funciona para CEP's do território brasileiro.\n Utilize apenas números.");
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite o seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="white"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span>Logradouro: {cep.logradouro}</span>
        {Object.keys(cep.complemento).length > 0 && (<span>Complemento: {cep.complemento}</span>)}
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade} - {cep.uf}</span>

      </main>
      )}
      
    </div>
  );
}

export default App;
