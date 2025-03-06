import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Page from "./Page.jsx";
const Poke = () => {
  const [page, setPage] = useState(0);
  const [pokeList, setPokeList] = useState([]);
  const [pokeImage, setPokeImage] = useState();
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    fetchPokeList();
  }, []);
  const fetchPokeList = async () => {
    const offset = page * 20;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
    const result = await axios.get(apiUrl);
    const pokeNames = result.data.results.map((item) => {
      return item.name;
    });
    setPokeList(pokeNames);
    setIsLoad((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <div className="bg-black">
        <h1 className="text-white text-center p-5 text-2xl">Poke app</h1>
      </div>
      <div className="border-2 border-solid border-indigo-500 rounded-sm">
        {/* <img src={isLoad ? pokeImage : null} alt="" /> */}
        <h2 className="text-center">pokename</h2>
        {pokeList.map((item) => {
          return (
            <p className="text-center" key={item}>
              {item}
            </p>
          );
        })}
      </div>
      <Page />
    </>
  );
};

export default Poke;
