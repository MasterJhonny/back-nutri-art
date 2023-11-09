const express = require('express');

const usersRouter = require('./router.users');
const materialRouter = require('./router.material');
const operationsRouter = require('./router.operations');
const employesRouter = require('./router.employes');
const inCostsRouter = require('./router.indirect.costs');
const lotesRouter = require('./router.lotes');
const summaryCostRouter = require('./router.summary.cost');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/material', materialRouter);
  router.use('/operations', operationsRouter);
  router.use('/employes', employesRouter);
  router.use('/incost', inCostsRouter);
  router.use('/lotes', lotesRouter);
  router.use('/summarycost', summaryCostRouter);
}

module.exports = routerApi;
