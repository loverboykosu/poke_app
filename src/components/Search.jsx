import React from "react";
import { FaSearch } from "react-icons/fa";
const Search = (props) => {
  return (
    <>
      <section className="flex justify-end">
        <div className="flex items-center bg-gray-200 p-2 rounded border border-solid">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="検索ワード"
            className="bg-gray-200 focus:outline-none w-64"
            onChange={props.onInputChange}
          />
        </div>
        <button
          onClick={props.onSubmit}
          className="bg-gray-800 hover:bg-gray-200 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </section>
    </>
  );
};
export default Search;
