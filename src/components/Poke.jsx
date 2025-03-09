import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Page from "./Page.jsx";
const Poke = () => {
  const [page, setPage] = useState(0);
  const [pokeList, setPokeList] = useState([]);
  const [pokeImage, setPokeImage] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    fetchPokeList();
  }, [page]);

  useEffect(() => {
    fetchPokeImage();
  }, [pokeList]);
  const fetchPokeList = async () => {
    const offset = page * 20;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
    const result = await axios.get(apiUrl);
    setPokeList(result.data.results);
  };
  const fetchPokeImage = async () => {
    if (pokeList.length) {
      const pokeImages = await Promise.all(
        pokeList.map(async (item) => {
          const response = await axios.get(item.url);
          return response.data.sprites.front_default; // 画像URLを取得
        })
      );
      setPokeImage(pokeImages); // 画像URLの配列をセット
    }
    setIsLoad(true);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };
  // const fetchPokeImages = async()
  return (
    <>
      <div className="bg-black">
        <h1 className="text-white text-center p-5 text-2xl">Poke app</h1>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {pokeList.map((item, index) => {
          return (
            <div key={item.name} className="text-center">
              <p>{item.name}</p>
              <img
                src={isLoad ? pokeImage[index] : null}
                alt=""
                className="mx-auto"
              />
              <div className="text-sky-400">
                <a href={item.url}>{item.url}</a>
              </div>
            </div>
          );
        })}
      </div>
      <Page onPrev={prevPage} onNext={nextPage} page={page} />
    </>
  );
};

export default Poke;
