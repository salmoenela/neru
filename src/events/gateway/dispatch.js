export default {
  op: 0,
  async execute(data) {
    const event = data.ws.events.dispatch.find(ctx => ctx.t === data.t);
    if (event) return await event.execute(data);
  }
}
