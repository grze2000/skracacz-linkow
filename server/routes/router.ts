import { Router } from "https://deno.land/x/oak/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import LinkSchema from '../models/Link.ts';

const client = new MongoClient();
client.connectWithUri(config()['MONGODB_URI']);

const db = client.database(config()['MONGODB_DB']);
const links = db.collection(config()['MONGODB_COLLECTION']);

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const router = new Router();

router.get('/links', async (ctx) => {
    const allLinks: LinkSchema[] = await links.find();
    ctx.response.body = allLinks.map(link => {
        const { _id: { $oid }, url, code} = link;
        return {_id: $oid, url, code};
    });
});

router.get('/links/:code', async (ctx) => {
    if(ctx.params && ctx.params.code) {
        const link = await links.findOne({code: ctx.params.code});
        if(link) {
            ctx.response.body = {url: link.url};
        } else {
            ctx.response.status = 400;
        }
    }
});

router.post('/links', async (ctx) => {
    const body = await ctx.request.body();
    const link = await body.value.get('link');;
    if(link !== null) {
        let code = '';
        const lastDocument = await links.aggregate([
            {$sort: {_id: -1}},
            {$limit: 1}
        ]);

        if(lastDocument.length) {
            const lastCode = lastDocument[0].code;
            const index = chars.indexOf(lastCode[lastCode.length-1]);

            if(index < chars.length) {
                code = lastCode.substring(0, lastCode.length-1) + chars[index+1];
            } else {
                code = lastCode + chars[0];
            }
        } else {
            code = chars[0];
        }

        await links.insertOne({
            url: link,
            code: code
        });
        ctx.response.status = 201;
        ctx.response.body = {code: code};
    } else {
        ctx.response.status = 400;
        ctx.response.body = 'No link provided';
    }
});

export default router;