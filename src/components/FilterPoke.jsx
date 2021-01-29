import React from "react";
import notFoundLogo from "./images/not-found.jpg";

function useSearch(pokemons) {
  const [query, setQuery] = React.useState("");
  const [filterPoke, setFilterPoke] = React.useState(pokemons);

  React.useMemo(() => {
    const result = pokemons.filter((pokemon) => {
      return `${pokemon.Name} ${pokemon.Types[0]}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setFilterPoke(result);
  }, [pokemons, query]);

  return { query, setQuery, filterPoke };
}

function FilterPoke(props) {
  const { query, setQuery, filterPoke } = useSearch(props.pokemons);

  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <ul className="suggestions">
        {filterPoke.map((pokemons) => (
          <li key={pokemons.Number}>
            <img src={pokemons.img} alt="pokemon" />
            <div className="info">
              <h1>
                <span className="hl">{pokemons.Name}</span>
              </h1>
              <span className="type electric">{pokemons.Types[0]}</span>
              {pokemons.Types[1] && (
                <span className="type normal">{pokemons.Types[1]}</span>
              )}
            </div>
          </li>
        ))}
        {filterPoke.length === 0 && (
          <li>
            <img src={notFoundLogo} alt="" />
            <div className="info">
              <h1 className="no-results">No results</h1>
            </div>
          </li>
        )}
      </ul>
    </>
  );
}
export default FilterPoke;