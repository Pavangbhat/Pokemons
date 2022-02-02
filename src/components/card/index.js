import React from "react";
import "./style.css";

const colorCode = {
  Fire: "#fa0c0c",
  Poison: "#74f1fb",
  Water: "#267dfc",
  Grass: "#0fa805",
  Bug: "#97c698",
  Flying: "#dedede",
  Normal: "#d5e9fa",
  Electric: "#FFFF00",
  Ground: "#ed9b56",
  Fairy: "#ffa0b1",
  Fighting: "#e00b5b",
  Psychic: "#d257ff",
  Rock: "#b2adad",
  Steel: "#4682B4",
  Ice: "#C0C0C0",
  Dragon: "#fe6c6c",
  Dark: "#949494",
  Ghost: "#008b8b"
}

const PokemonCard = ({ info }) => {
  const { name: title, type: types } = info
  const { HP, Defense, Attack } = info.base

  const pokemonImage = `/images/${title.english.toLowerCase()}.jpg`;
  return (
    <div className="card">
      <div className="main">
        <img className="pokemonImage" src={pokemonImage} alt={title.english} />
        <p className="title">{title.english}</p>
        <div className="typeWrapper">
          {types.map((type) => <span className="type" style={{ color: `${colorCode[type]}` }}>{type}</span>)}
        </div>
      </div>
      <div>
        <ul className="list">
          <li className="listItem">
            HP {HP}
          </li>
          <li className="listItem">
            Defense {Defense}
          </li>
          <li className="listItem">
            Attack {Attack}
          </li>
        </ul>
      </div>
    </div >
  );
};

export default PokemonCard;