import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import PokemonCard from "./components/PokemonCard";

function App() {

    const [allPokemonData, setAllPokemonData] = useState([]);
    const [offset, setOffset] = useState(0);
    const cardLimit = 24;

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${cardLimit}&offset=${offset}`);
                setAllPokemonData(result.data.results);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchData();
    }, [offset]);

    return (
        <>
            <header>
                <button
                    className="prevButton"
                    //These onClicks don't work unfortunately, I wish I had more time to figure it out but alas, busy week.
                    onClick={() => setOffset(offset-cardLimit)}
                    disabled={offset<cardLimit}

                >
                    Previous
                </button>
                <button
                    className="nextButton"
                    //These onClicks don't work unfortunately, I wish I had more time to figure it out but alas, busy week.
                    onClick={() => setOffset(offset+cardLimit)}
                >
                    Next
                </button>
            </header>
            {Object.keys(allPokemonData).length > 0 &&
                <article className="cardCollection">
                    {
                        allPokemonData.map((pokemon) =>
                            <PokemonCard
                                pokemonEndpoint={pokemon.url}
                            />
                        )
                    }
                </article>
            }
        </>
    );
}

export default App;
