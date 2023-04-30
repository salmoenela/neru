export default {
  op: 1,
  execute(data) {
    data.ws.send(JSON.stringify({
      op: 1,
      d: data.ws.cache.seq
    }))
  }
}
