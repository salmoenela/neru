export default {
  op: 10,
  execute(data) {
    console.log("Hello", data);
    setInterval(() => {
      if (data.ws.readyState != data.ws.OPEN) return;
      data.ws.send(JSON.stringify({
        op: 1,
        d: data.ws.cache.seq
      }));
    }, data.d.heartbeat_interval);
  }
}
