import React from "react";
import { useState, useEffect } from "react";
import Page from "./Page.jsx";
import Search from "./Search.jsx";
import poke from "../lib/poke.jsx";
const Poke = () => {
  const [page, setPage] = useState(0);
  const [pokeList, setPokeList] = useState([]);
  const [pokeImage, setPokeImage] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const [isPoke, setIsPoke] = useState();
  useEffect(() => {
    fetchPokeList();
  }, [page, searchStatus]);

  useEffect(() => {
    fetchPokeImage();
  }, [pokeList, searchStatus]);
  const fetchPokeList = async () => {
    const offset = page * 20;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
    const result = await poke.fetchData(apiUrl);
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
          const response = await poke.fetchData(item.url);
          return response.data.sprites.front_default;
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
  const getInput = (e) => {
    setSearchWord(e.target.value);
  };
  //search
  const searchPoke = async () => {
    const searchPokeUrl = "https://pokeapi.co/api/v2/pokemon/" + searchWord;
    const searchResults = await poke.fetchData(searchPokeUrl);
    if (searchResults.message) {
      setSearchStatus(true);
      setIsPoke(false);
    } else if (searchResults.data.id) {
      setSearchStatus(true);
      setSearchResult(searchResults.data.sprites.front_default);
    }
  };
  const getBack = () => {
    setSearchStatus(false);
  };
  return (
    <>
      <div className="bg-black">
        <h1 className="text-white text-center p-5 text-2xl">Poke app</h1>
      </div>

      {searchStatus && (
        <>
          <div className="text-center">
            {!isPoke && (
              <h1 className="text-center">{searchWord} does not exist</h1>
            )}
            <img
              src={searchResult ? searchResult : "./dummy.png"}
              alt=""
              className="mx-auto"
            />
            <p>{searchWord}</p>

            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={getBack}
            >
              return
            </button>
          </div>
        </>
      )}
      {!searchStatus && (
        <>
          <div>
            <Search onInputChange={getInput} onSubmit={searchPoke} />
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
      )}
    </>
  );
};

export default Poke;
