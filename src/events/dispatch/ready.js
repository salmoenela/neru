export default {
  t: "READY",
  execute(data) {
    const { v, user, resume_gateway_url, session_id } = data.d;
    data.ws.cache = {
      v, client: user, session_id, resume_gateway_url, seq: data.s
    }
  }
}
