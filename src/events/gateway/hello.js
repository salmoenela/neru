export default {
  op: 10,
  execute(data) {
    setInterval(() => {
      data.ws.send(JSON.stringify({
        op: 1,
        d: data.ws.cache.seq
      }));
    }, data.d.heartbeat_interval);
  }
}
