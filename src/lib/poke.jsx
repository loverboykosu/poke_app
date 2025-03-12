import { React } from "react";
import axios from "axios";
class PokeClient {
  static async initialize() {
    const offset = page * 20;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
    const response = await axios.get(apiUrl);
    let poke = new PokeClient();
    return poke;
  }
  async fetchPokeList() {
    const result = await axios.get(apiUrl);
    if (result.data.results.length > 0) {
      setHasNext(true);
      setPokeList(result.data.results);
    } else {
      setHasNext(false);
    }
  }

  async searchSongs(keyword, limit, offset) {}
}

const poke = await PokeClient.initialize();
export default poke;
