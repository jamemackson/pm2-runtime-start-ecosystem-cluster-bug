import Koa, { Context } from "koa";

const app = new Koa();

app.use(async (ctx: Context) => {
  console.log("core api called...", { logged: "object" });
  ctx.body = "Hello World (core api)";
});

app.listen(3000, () => console.log("listening on port 3000"));
