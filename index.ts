// CHIC-SPRESS : Server library for deno

import serveRoute from "./methods/serveRoute.ts";

var routes: { [id: string]: Array<any> } = {
  get: [],
  post: [],
};

class serverClass {
  server: any;

  constructor(server: any) {
    this.server = server;
    this.run();
  }

  get(path: string, callback: Function): void {
    routes.get.push({
      path: path,
      callback: callback,
    });
  }

  post(path: string, callback: Function): void {
    routes.post.push({
      path: path,
      callback: callback,
    });
  }

  async run() {
    for await (const req of this.server) {
      const method: string = req.method;
      const url: string = req.url;

      switch (method) {
        case "GET":
          serveRoute(req,"GET",url,routes);
          break;
        case "POST":
          serveRoute(req,"POST",url,routes);
          break;
      }
    }
  }
}

export const app = serverClass;
