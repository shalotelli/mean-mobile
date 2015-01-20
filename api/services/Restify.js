module.exports = function (route, controller) {
  var path = '/' + route,
      pathWithId = path + '/:id';

  app.get(path, controller.find);
  app.get(pathWithId, controller.find);
  app.post(path, controller.create);
  app.put(pathWithId, controller.update);
  app.delete(pathWithId, controller.delete);
};
