const express = require('express');

const usersRouter = require('./router.users');
const materialRouter = require('./router.material');
const operationsRouter = require('./router.operations');
const employesRouter = require('./router.employes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/material', materialRouter);
  router.use('/operations', operationsRouter);
  router.use('/employes', employesRouter);
}

module.exports = routerApi;
