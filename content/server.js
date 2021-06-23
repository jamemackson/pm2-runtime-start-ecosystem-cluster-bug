const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  console.log("content api called...");
  return (ctx.body = "Hello World (content api)");
});

app.listen(3001, () => console.log("listening on port 3001"));
