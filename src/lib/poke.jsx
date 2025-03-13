import { React } from "react";
import axios from "axios";
class PokeClient {
  static async initialize() {
    let poke = new PokeClient();
    poke.hello = "hello";
    return poke;
  }
  async fetchData(apiUrl) {
    const result = await axios.get(apiUrl);
    return result;
  }
}

const poke = await PokeClient.initialize();
export default poke;
