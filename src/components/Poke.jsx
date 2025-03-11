import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Page from "./Page.jsx";
import Search from "./Search.jsx";
const Poke = () => {
  const [page, setPage] = useState(0);
  const [pokeList, setPokeList] = useState([]);
  const [pokeImage, setPokeImage] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
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
    if (result.data.results.length > 0) {
      setHasNext(true);
      setPokeList(result.data.results);
    } else {
      setHasNext(false);
    }
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
    setPage((prev) => {
      if (prev >= 0) {
        setHasPrev(true);
        return prev + 1;
      } else {
        setHasPrev(false);
      }
    });
  };
  const prevPage = () => {
    setPage((prev) => {
      return prev - 1;
    });
  };
  // const fetchPokeImages = async()
  return (
    <>
      <div className="bg-black">
        <h1 className="text-white text-center p-5 text-2xl">Poke app</h1>
      </div>
      <div>
        <Search />
      </div>

      <div className="grid grid-cols-4 gap-10">
        {pokeList.map((item, index) => {
          return (
            <div key={item.name} className="text-center">
              <img
                src={pokeImage[index] ? pokeImage[index] : "./dummy.png"}
                alt=""
                className="mx-auto"
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <Page
        onPrev={hasPrev ? prevPage : null}
        onNext={hasNext ? nextPage : null}
        page={page}
      />
    </>
  );
};

export default Poke;
