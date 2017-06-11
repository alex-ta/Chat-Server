const logger = require("../system/Logger")
/**
* Create Restconstroller
*
*/

class Controller{

  constructor(rootUrl, className, clazz){
    logger.log(rootUrl);
    logger.log(className);
    logger.log(clazz);
    this.rootUrl = rootUrl;
    this.className = className;
    this.clazz = clazz;
    this.basicUrl = this.rootUrl + this.className;
    this.idUrl = this.basicUrl + ":id";
  }

  append (app){
    // show all
    app.get(this.basicUrl, (req,res) => {
      this.clazz.find({}, function(err, obj) {
        console.log("returning")
        if (err)
          res.send(err);
        res.json(obj);
      });
    });

    logger.log(this.basicUrl);
    // show by id
    app.get(this.idUrl, (req,res) => {
      this.clazz.findById(req.params.id, function(err, obj) {
        if (err)
          res.send(err);
        res.json(obj);
      });
    });
    logger.log(this.idUrl);
    // create
    app.post(this.basicUrl, (req,res) => {
      var object = new this.clazz(req.body);
      object.save(function(err, object) {
        if (err)
          res.send(err);
        res.json(object);
      });
    });
    logger.log(this.basicUrl);
    // delete
    app.delete(this.idUrl, (req,res) => {
      this.clazz.remove({
        _id: req.params.taskId
      }, function(err, task) {
        if (err)
          res.send(err);
        res.json({ message: this.className + ' deleted' });
      });
    });
    logger.log(this.idUrl);
    // update
    app.put(this.idUrl, (req,res) => {
      this.clazz.findOneAndUpdate(req.params.id, req.body, {new: true}, function(err, obj) {
         if (err)
           res.send(err);
         res.json(obj);
      });
    });
    logger.log(this.idUrl);
  }
}

module.exports = Controller;
