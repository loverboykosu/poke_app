import React from "react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
const Search = () => {
  const [searchWord, setSearchWord] = useState("");
  const getInput = (e) => {
    setSearchWord(e.target.value);
  };
  return (
    <>
      <section className="flex justify-end">
        <div className="flex items-center bg-gray-200 p-2 rounded border border-solid">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="検索ワード"
            className="bg-gray-200 focus:outline-none w-64"
            onChange={getInput}
          />
        </div>
        <button className="bg-gray-800 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
      </section>
    </>
  );
};
export default Search;
