import Request from "./request.ts";

export default (req:any,method:string,url:string,routes: { [id: string]: Array<any> })=>{
    routes[method.toLocaleLowerCase()].forEach((route) => {
    var sectionsRoute = route.path.split("/");
    var sectionsURL = url.split("/");

    if (sectionsURL.length == sectionsRoute.length) {
      // If has same number of slashes
      var params : {[id:string] : string | number} = {};
      var matching: number = 0;
      for (let i = 0; i < sectionsRoute.length; i++) {
        var sectionR : string = sectionsRoute[i];
        var sectionU : string = sectionsURL[i];

        if(sectionR[0] == ":"){
          matching += 1;
          params[sectionR.substring(1)] = sectionU;
        }else{
          if(sectionR == sectionU){
            matching += 1;
          }else{
            return;
          }
        }
      }

      if(matching == sectionsURL.length){
        var request = new Request(req,params);
        request.decodeBody().then(()=>{
          route.callback(request);
        })
      }else{
        return;
      }
    }else{
      return;
    }
  });

}
