import React,{useEffect, useState} from "react";
import "./style.css";

const Sortby = ({sortPokemons}) => {
  const [isAscending , setIsAscending ] = useState(true);

  useEffect(()=>{
      sortPokemons(isAscending)
  },[])

  return (
    <div className="sortby-wrapper">
      <label className="label">Sort By:</label>
      <span onClick={()=>{
          sortPokemons(!isAscending )
          setIsAscending (!isAscending )
      }}>{isAscending  ? 'A-Z' : 'Z-A'}</span>
    </div>
  );
};

export default Sortby;