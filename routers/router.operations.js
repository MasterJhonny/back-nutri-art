const express = require("express");

const OperationService = require("../services/service.operations");
const MaterialService = require('../services/service.material');
// const validatorHandler = require('./../middlewares/validator.handler');
// const { updateTodoSchema, createTodoSchema, getTodoSchema } = require('./../schemas/user.schema');

const { buildDataInOperation, buildDataOutOperation } = require("../func");

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
      const listPreviouOperations = await service.findByMaterialId(data.materialId);
      console.log("🚀 ~ file: router.operations.js:48 ~ listPreviouOperations:", listPreviouOperations);
      if (data.type === 1) {
        // build data in
        newOperation = buildDataInOperation(data, listPreviouOperations);
        console.log("🚀 ~ file: router.operations.js:52 ~ newOperation:", newOperation);
      } else {
        // build data out
        const listInOperations = await service.findByAvailablePartialMaterialId(data.materialId);
        const lastOperation = listPreviouOperations[listPreviouOperations.length - 1];
        console.log("🚀 ~ file: router.operations.js:56 ~ listInOperations:", listInOperations);
        newOperation = buildDataOutOperation(data, listInOperations, lastOperation);
      }
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
