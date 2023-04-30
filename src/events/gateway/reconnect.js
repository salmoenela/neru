import { connect } from "../../index.js";

export default {
  op: 7,
  async execute(data) {
    await connect(data.ws.cache);
  }
}
