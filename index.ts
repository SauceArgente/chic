import {app} from "./lib-test/index.ts";
import { serve } from "https://deno.land/std@0.88.0/http/server.ts";

const server = serve({ port: 8000 });
const chic = new app(server);

chic.get("/", (req:any) => {
    req.write("/")
    req.send();
})


chic.get("/users/:userID", (req:any) => {
    req.json({
        type:"Success",
        message:`${req.params().userID}`
    })
    req.send();
})