import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import Router from './routes/router.ts'

const app = new Application();

app.use(Router.routes());
app.use(Router.allowedMethods());

const port = parseInt(config()['PORT']) || 3000;

console.log(`Listening on ${port}`);
await app.listen({ port: port });