import { reonnect } from "../../index.js";

export default {
  op: 7,
  async execute(data) {
    await reconnect(data.ws.cache);
  }
}
