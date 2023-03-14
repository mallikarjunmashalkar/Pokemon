import React, { useState, useEffect } from "react";
import axios from "axios";

const ButtonHitApi = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [detailsUrl, setDetailsUrl] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios.get(currentPageUrl)
      .then(response => {
        setLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemon(response.data.results.map(p => p.name));
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  }, [currentPageUrl]);

  const handleNextClick = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const handlePrevClick = () => {
    setCurrentPageUrl(prevPageUrl);
  };

  const handlePokemonClick = (pokemonName) => {
    setDetailsUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    setSelectedPokemon(pokemonName);
  };

  const PokemonCard = ({ name }) => (
    <div className="pokemon-card" onClick={() => handlePokemonClick(name)}>
      <h3>{name}</h3>
    </div>
  );

  const PokemonDetails = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [details, setDetails] = useState(null);

    useEffect(() => {
      setLoading(true);
      setError(false);

      if (detailsUrl) {
        axios.get(detailsUrl)
          .then(response => {
            setLoading(false);
            setDetails(response.data);
          })
          .catch(error => {
            setLoading(false);
            setError(true);
          });
      }
    }, [detailsUrl]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error fetching details</p>;
    }

    if (!details) {
      return null;
    }

    return (
      <div className="pokemon-details">
        <h2>{details.name}</h2>
        <img src={details.sprites.front_default} alt={details.name} />
        <p>Height: {details.height}</p>
        <p>Weight: {details.weight}</p>
      </div>
    );
  };

  return (
    <div className="pokemon-list">
      {selectedPokemon && <PokemonDetails />}
      <h1>Pokemon List</h1>
      {loading ? <p>Loading...</p> :
        error ? <p>Error fetching Pokemon list</p> :
          <>
            <div className="pokemon-cards">
              {pokemon.map(name => (
                < PokemonCard key={name} name={name} />
              ))}
            </div>
            <div className="pagination ">
              <button onClick={handlePrevClick} disabled={!prevPageUrl}>Previous</button>
              <button onClick={handleNextClick} disabled={!nextPageUrl}>Next</button>
            </div>
          </>
      }     
    </div>
  );
};

export default ButtonHitApi;
