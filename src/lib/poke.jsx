import { React } from "react";
import axios from "axios";
class PokeClient {
  static async initialize() {
    let poke = new PokeClient();
    poke.hello = "hello";
    return poke;
  }
  async fetchData(apiUrl) {
    try {
      const result = await axios.get(apiUrl);
      return result;
    } catch (error) {
      return error;
    }
  }
}

const poke = await PokeClient.initialize();
export default poke;
