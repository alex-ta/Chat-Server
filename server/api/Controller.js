const logger = require('../system/Logger')
/**
 * Create Restconstroller
 *
 */

class Controller {

  constructor(rootUrl, className, clazz) {
    this.rootUrl = rootUrl;
    this.className = className;
    this.clazz = clazz;
    this.basicUrl = this.rootUrl + this.className;
    this.idUrl = this.basicUrl + ':id';
  }

  append(app) {
    // show all
    app.get(this.basicUrl, (req, res) => {
      this.clazz.find({}, function(err, obj) {
        if (err) {
          res.send(err);
        } else {
          res.json(obj);
        }
      });
    });
    logger.log('[GET] ' + this.basicUrl);
    // show by id
    app.get(this.idUrl, (req, res) => {
      if (req.params.id == 'undefined') {
        const required = [];
        const attributes = this.clazz.schema.obj;
        Object.keys(attributes).forEach((key) => {
          // print just required attributes
          if (typeof(attributes[key]) == 'object') {
            required.push(key);
          }
        });
        res.json(required);
      } else {
        this.clazz.findById(req.params.id, function(err, obj) {
          if (err) {
            res.send(err);
          } else {
            res.json(obj);
          }
        });
      }
    });
    logger.log('[GET]' + this.idUrl);
    // create
    app.post(this.basicUrl, (req, res) => {
      var object = new this.clazz(req.body);
      object.save(function(err, obj) {
        if (err) {
          res.send(err);
        } else {
          res.json(obj);
        }
      });
    });
    logger.log('[POST]' + this.basicUrl);
    // delete
    const className = this.className;
    app.delete(this.idUrl, (req, res) => {
      this.clazz.remove({
        _id: req.params.id
      }, function(err, task) {
        if (err) {
          res.send(err);
        } else {
          res.json({
            message: className + ' deleted'
          });
        }
      });
    });
    logger.log('[DELETE]' + this.idUrl);
    // update
    app.put(this.idUrl, (req, res) => {
      console.log(req.params.id);
      this.clazz.findOneAndUpdate({
        _id: req.params.id
      }, req.body, {
        new: true
      }, function(err, obj) {
        if (err) {
          res.send(err);
        } else {
          res.json(obj);
        }
      });
    });
    logger.log('[PUT]' + this.idUrl);
  }
}

module.exports = Controller;
