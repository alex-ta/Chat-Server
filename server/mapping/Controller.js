function Mapping(){
  append = function(app, rootUrl, className, idName){
    basicUrl = rootUrl + "/" + className + "/";
    concreteUrl = basicUrl + ":id";

    // show all
    app.get(urlRoot, (req,res) => {
      let html = '';
      let obKeys = Object.keys(path);
      for(let i = 0; i < obKeys.length; i++){
        html+='<a href='+obKeys[i]+'> '+path[obKeys[i]]+' </a>';
      }
      res.send(html);
    });

    app.get('/', (req,res) => {
      let html = '';
      let obKeys = Object.keys(path);
      for(let i = 0; i < obKeys.length; i++){
        html+='<a href='+obKeys[i]+'> '+path[obKeys[i]]+' </a>';
      }
      res.send(html);
    });

    app.get('/', (req,res) => {
      let html = '';
      let obKeys = Object.keys(path);
      for(let i = 0; i < obKeys.length; i++){
        html+='<a href='+obKeys[i]+'> '+path[obKeys[i]]+' </a>';
      }
      res.send(html);
    });

    app.get('/', (req,res) => {
      let html = '';
      let obKeys = Object.keys(path);
      for(let i = 0; i < obKeys.length; i++){
        html+='<a href='+obKeys[i]+'> '+path[obKeys[i]]+' </a>';
      }
      res.send(html);
    });

    app.get('/', (req,res) => {
      let html = '';
      let obKeys = Object.keys(path);
      for(let i = 0; i < obKeys.length; i++){
        html+='<a href='+obKeys[i]+'> '+path[obKeys[i]]+' </a>';
      }
      res.send(html);
    });

    app.get('/', (req,res) => {
      let html = '';
      let obKeys = Object.keys(path);
      for(let i = 0; i < obKeys.length; i++){
        html+='<a href='+obKeys[i]+'> '+path[obKeys[i]]+' </a>';
      }
      res.send(html);
    });
  }
}
