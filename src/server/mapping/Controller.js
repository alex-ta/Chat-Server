/**
* Create Restconstroller
*
*/

function Mapping(rootUrl){

  const _rootUrl = rootUrl;
  const db = "";

  append = function(app, clazz){
    basicUrl = _rootUrl + "/" + className + "/";
    concreteUrl = basicUrl + ":id";

    // show all
    app.get(basicUrl, (req,res) => {
      res.send(db.getAll());
    });
    app.get(concreteUrl, (req,res) => {
      const id = req.params.id;
      res.send(db.getById(id));
    });
    app.post(basicUrl, (req,res) => {
      const obj = req.body;
      res.send("");
    });
    app.delete(concreteUrl, (req,res) => {
      const id = req.params.id;
      db.delete(id);
      res.send(html);
    });
    app.update(concreteUrl, (req,res) => {
      const id = req.paras.id;
      user = db.getById(id);
      // update user;
      db.save(user,req.body);
      res.send(html);
    });
  }
}
