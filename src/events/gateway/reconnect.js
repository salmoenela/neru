import { connect } from "../../index.js";

export default {
  op: 7,
  execute(data) {
    connect(data.ws.cache);
  }
}
