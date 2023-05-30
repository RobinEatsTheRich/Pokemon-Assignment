import React from 'react';
import './App.css';

function App() {

    async function fetchData() {
        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`);
            console.log(result.data);
        } catch (e) {
            console.error(e);
        }
    }


  return (
    <div>
      Begin hier met de opdracht!
    </div>
  );
}

export default App;
