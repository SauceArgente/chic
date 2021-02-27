import { objValAny, objValStrNum } from "./structures.ts";
import { encode, decode } from "https://deno.land/std/encoding/base32.ts";

const defaultData = {
  status: 200,
  body: "",
};


export default class request {
  req: any;
  parameters: objValStrNum;
  data: objValAny;
  body : Record<string,any>;
  headers: any;

  constructor(req: any, params: objValStrNum) {
    this.req = req;
    this.parameters = params;
    this.data = defaultData;
    this.body = {};
    this.headers = req.headers;
  }

  decodeBody() : Promise<void> {
    return new Promise((resolve,reject)=>{
      Deno.readAll(this.req.body).then(d=>{
        if(d.length > 0 ){
          const decoder = new TextDecoder();
          const json = JSON.parse(decoder.decode(d));
          this.body = json
        }else{
          this.body = {};
        }
        resolve();
      });
    })
  }

  params() {
    return this.parameters;
  }

  //async body() {
  //  return await Deno.readAll(this.req.body);
  //}

  status(status: number) {
    this.data.status = status;
  }

  write(data: string) {
    this.data.body += data;
  }

  json(data:Record<string,any>){
    this.data.body = JSON.stringify(data);
  }

  send() {
    this.req.respond(this.data);
  }
}
