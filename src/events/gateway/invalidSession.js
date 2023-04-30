import { connect } from "../../index.js";

export default {
  op: 9,
  async execute(data) {
    await connect(data.d ? data.ws.cache : null)
  }
}
