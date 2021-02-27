import { objValAny, objValStrNum } from "./structures.ts";

const defaultData = {
  status: 200,
  body: "",
};

export default class request {
  req: any;
  parameters: objValStrNum;
  data: objValAny;

  constructor(req: any, params: objValStrNum) {
    this.req = req;
    this.parameters = params;
    this.data = defaultData;
  }

  params() {
    return this.parameters;
  }

  body() {
    return this.req.body;
  }

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
