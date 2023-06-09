import { connect, reconnect } from "../../index.js";

export default {
  op: 9,
  execute(data) {
    if (data.d) {
      reconnect(data.ws.cache);
    } else connect();
  }
}
