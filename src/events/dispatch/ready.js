export default {
  t: "READY",
  execute(data) {
    data.ws.cache.session_id = data.d.session_id;
    data.ws.cache.resume_gateway_url = data.d.resume_gateway_url;
  }
}
