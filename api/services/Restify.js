module.exports = function (route, controller) {
  var path = '/' + route,
      pathWithId = path + '/:id';

  app.get(path, function (req, res) {
    controller.find(req, res);
  });

  app.get(pathWithId, function (req, res) {
    controller.find(req, res);
  });

  app.post(path, function (req, res) {
    controller.create(req, res);
  });

  app.put(pathWithId, function (req, res) {
    controller.update(req, res);
  });

  app.delete(pathWithId, function (req, res) {
    controller.delete(req, res);
  });
};
