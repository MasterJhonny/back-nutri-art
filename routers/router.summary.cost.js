const express = require('express');

const SummaryCostService = require('../services/service.summary.cost');
const EmployeService = require('../services/service.employes');
const IndirectCostService = require('../services/service.indirect.costs');
const OperationService = require('../services/service.operations');

const { buildDataSummary, buildDataInOperation } = require("../func");
const { finishedProductId, defaultDetail, defaultLotSize } = require("../const");

const { Promise } = require('mongoose');

const router = express.Router();
const service = new SummaryCostService();
const serviceEmploye = new EmployeService();
const serviceInCost = new IndirectCostService();
const serviceOperation = new OperationService();

router.get('/', async (req, res, next) => {
  try {
    const summaries = await service.find();
    res.status(200).json(summaries);
  } catch (error) {
    // next(error);
    console.error(error);
  }
});

router.get('/:id',
  // validatorHandler(getTodoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("🚀 ~ file: router.summary.js:25 ~ id:", id)
      const summary = await service.findOne(id);
      res.json(summary);
    } catch (error) {
      // next(error);
      console.error(error);
    }
  }
);

router.post('/',
  // validatorHandler(createTodoSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const response = await Promise.all([serviceEmploye.find(), serviceInCost.find(), serviceOperation.findByMaterialId(finishedProductId)])
      const newSummary = buildDataSummary(data, response[0], response[1]);
      console.log("🚀 ~ file: router.summary.cost.js:47 ~ newSummary:", newSummary);
      const record = {
        amount: defaultLotSize,
        currentUnitCost: [newSummary.unitCost],
        total: newSummary.productionCost,
      }
      const dataPreviu = {
        date: new Date(),
        detail: defaultDetail,
        type: 1,
        record: record,
        materialId: finishedProductId,
      }
      const newOperation = buildDataInOperation(dataPreviu, response[2]);
      console.log("🚀 ~ file: router.summary.cost.js:65 ~ newOperation:", newOperation);
      const rta = await Promise.all([service.create(newSummary), serviceOperation.create(newOperation.data)])
      res.status(201).json(rta[0]);
    } catch (error) {
      console.error(error);
       // next(error);
    }
  }
);

router.patch('/:id',
// validatorHandler(getTodoSchema, 'params'),
// validatorHandler(updateTodoSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log('note update!!', id, body);
    const rta = await service.update(id, body);
    console.log("🚀 ~ file: router.material.js:61 ~ rta:", rta);
    const updateMaterial = await service.findOne(id);
    res.json(updateMaterial);
  } catch (error) {
    console.log(error);
    // next(error);
  }
}
);

router.delete('/:id',
// validatorHandler(getTodoSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('id for delete!!', id)
    const deleteMaterial = await service.delete(id);
    res.status(201).json(deleteMaterial);
  } catch (error) {
    // next(error);
    console.error(error);
  }
}
);

module.exports = router;
