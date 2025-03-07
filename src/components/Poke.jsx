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
  }, [page]);
  const fetchPokeList = async () => {
    const offset = page * 20;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
    const result = await axios.get(apiUrl);
    setPokeList(result.data.results);
    setIsLoad((prev) => {
      return !prev;
    });
  };
  // const fetchPokeImages = async()
  return (
    <>
      <div className="bg-black">
        <h1 className="text-white text-center p-5 text-2xl">Poke app</h1>
      </div>
      <div className="border-2 border-solid border-indigo-500 rounded-sm">
        {/* <img src={isLoad ? pokeImage : null} alt="" /> */}
        <h1 className="text-center">pokename</h1>
        {pokeList.map((item) => {
          return (
            <div key={item.name}>
              <p className="text-center">{item.name}</p>
              <p className="text-center text-blue-600/100 dark:text-sky-400/100">
                {item.url}
              </p>
            </div>
          );
        })}
      </div>
      <Page page={page} />
    </>
  );
};

export default Poke;
