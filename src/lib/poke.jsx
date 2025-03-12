import { React } from "react";
import axios from "axios";
class PokeClient {
  static async initialize() {
    const apiUrl = "https://accounts.spotify.com/api/token";
    const response = await axios.get(apiUrl);
    let poke = new PokeClient();
    return poke;
  }
  async searchSongs(keyword, limit, offset) {}
}

const poke = await PokeClient.initialize();
export default poke;
