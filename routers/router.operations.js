const express = require("express");

const OperationService = require("../services/service.operations");
const MaterialService = require('../services/service.material');
// const validatorHandler = require('./../middlewares/validator.handler');
// const { updateTodoSchema, createTodoSchema, getTodoSchema } = require('./../schemas/user.schema');

const { calculateBalanceAnyPreviou, calculateBalanceWithPreviou } = require("../func");

const router = express.Router();
const service = new OperationService();
const serviceMaterial = new MaterialService();

router.get("/", async (req, res, next) => {
  try {
    const operations = await service.find();
    res.status(200).json(operations);
  } catch (error) {
    // next(error);
    console.error(error);
  }
});

router.get(
  "/:id",
  // validatorHandler(getTodoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("🚀 ~ file: router.opetarion.js:25 ~ id:", id);
      const opetarions = await service.findByMaterialId(id);
      res.json(opetarions);
    } catch (error) {
      // next(error);
      console.error(error);
    }
  }
);

router.post(
  "/",
  // validatorHandler(createTodoSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      let newOperation = {};
      console.log("🚀 ~ file: router.opetarion.js:40 ~ opetarion:", data);
      const operationsPrevious = await service.findByMaterialId(data.materialId);
      console.log("🚀 ~ file: router.operations.js:45 ~ operationsPrevious:", operationsPrevious);
      if (operationsPrevious.length === 0) {
        console.log('No hay regitros anteriores!!');
        newOperation = calculateBalanceAnyPreviou(data);
      } else {
        console.log('Yes!, hay regitros anteriores!!');
        newOperation = calculateBalanceWithPreviou(data, operationsPrevious[operationsPrevious.length - 1].balances);
      }
      const dataUpdatedMaterial = {
        stock: newOperation.balances.total,
        currentUnitCost: newOperation.balances.currentUnitCost
      }
      const updateMaterial = await serviceMaterial.update(newOperation.materialId, dataUpdatedMaterial);
      const rta = await service.create(newOperation);
      res.status(201).json(rta);
    } catch (error) {
      console.error(error);
      // next(error);
    }
  }
);

router.delete(
  "/:id",
  // validatorHandler(getTodoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("id for delete!!", id);
      const deleteOperation = await service.delete(id);
      res.status(201).json(deleteOperation);
    } catch (error) {
      // next(error);
      console.error(error);
    }
  }
);

module.exports = router;
