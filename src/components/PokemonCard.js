import React, {useEffect, useState} from 'react';
import './PokemonCard.css';
import axios from "axios";

const PokemonCard = ({pokemonEndpoint}) => {
    const [pokemonData, setPokemonData] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(pokemonEndpoint);
                setPokemonData(result.data);
                console.log("I'm in the card");
                console.log(pokemonData);
            } catch (e) {
                console.error(e);
            }
        }

        if (pokemonEndpoint) {
            void fetchData();
        }
    }, []);

    function capitalisedName() {
        //I want the names to be capitalised
        const firstLetter = pokemonData.name.charAt(0);
        const slicedName = pokemonData.name.slice(1);
        return (firstLetter.toUpperCase() + slicedName);
    }

    return (
        <>
            {pokemonData.sprites &&
                <div className="pokemonCard">
                    <h2>{capitalisedName()}</h2>
                    <img src={pokemonData.sprites.front_default} alt={`A sprite of ${capitalisedName()}`}/>
                    <p><strong>Moves: </strong>{pokemonData.moves.length}</p>
                    <p><strong>Weight: </strong>{pokemonData.weight}</p>
                    <strong>Abilities:</strong>
                    <ul className="abilitiesContainer">
                        {
                            pokemonData.abilities.map((ability) =>
                                <li key={`${ability.ability.name}-${pokemonData.name}`}>{ability.ability.name}</li>)
                        }
                    </ul>
                </div>}
        </>
    );
};

export default PokemonCard;