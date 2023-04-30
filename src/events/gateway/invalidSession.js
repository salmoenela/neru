import { connect } from "../../index.js";

export default {
  op: 9,
  execute(data) {
    connect(data.d ? data.ws.cache : null)
  }
}
