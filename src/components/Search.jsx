import React from "react";
import { FaSearch } from "react-icons/fa";
const Search = () => {
  return (
    <>
      <section className="flex justify-end">
        <div className="flex items-center bg-gray-200 p-2 rounded border border-solid">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="検索ワード"
            className="bg-gray-200 focus:outline-none w-64"
          />
        </div>
      </section>
    </>
  );
};
export default Search;
