var _ = require('lodash');

var Crud = function (Model) {
  this.Model = Model;

  return {
    find: function (req, res) {
      var criteria = {},
          findMethod = 'find';

      if (req.params.id) {
        criteria._id = req.params.id;
        returnSingle = 'findOne';
      }

      if (! _.isEmpty(req.query)) {
        criteria = _.extend(criteria, req.query);
      }

      return this.Model[findMethod](criteria, function (err, documents) {
        if (err) {
          return res.status(501).json(err);
        }
        return res.json(documents);
      });
    },

    create: function (req, res) {
      var document;

      if (req.body) {
        document = new this.Model(req.body);

        document.save(function (err) {
          if (err) {
            return res.status(501).json(err);
          }

          return res.json(document);
        });
      } else {
        return res.status(400).json({ success: false });
      }
    },

    update: function (req, res) {
      if (req.params.id) {
        this.Model.findOne({ _id: req.params.id }, function (err, document) {
          if (err) {
            return res.status(501).json(err);
          }

          document = _.extend(document, req.body);

          document.save(function (err) {
            if (err) {
              return res.status(501).json(err);
            }

            return res.json(document);
          });
        });
      }
    },

    delete: function (req, res) {
      if (req.params.id) {
        this.Model.findOneAndRemove({ _id: req.params.id }, function (err, document) {
          if (err) {
            return res.status(501).json(err);
          }

          return res.json(document);
        });
      } else {
        return res.status(400).json({ success: false });
      }
    }
  };
};

module.exports = Crud;
