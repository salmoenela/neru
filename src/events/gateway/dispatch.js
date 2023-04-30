export default {
  op: 0,
  async execute(data) {
    const event = Object.values(data.ws.events.dispatch).find(ctx => ctx.t === data.t);
    if (event) return await event.execute(data);
  }
}
