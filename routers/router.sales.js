const express = require("express");
const SaleService = require("../services/service.sales");
const operationService = require("../services/service.operations");
const { buildDataOutOperationProduct, buildDataForRegisterSale } = require("../func");

const router = express.Router();
const service = new SaleService();
const serviceOperation = new operationService();

router.get("/", async (req, res, next) => {
  try {
    const sales = await service.find();
    res.status(200).json(sales);
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
      console.log("🚀 ~ file: router.sale.js:25 ~ id:", id);
      const sale = await service.findOne(id);
      res.json(sale);
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
      console.log("🚀 ~ file: router.sales.js:42 ~ data:", data)
      let newOperation = {};
      const listPreviouOperations = await serviceOperation.findByMaterialId(data.materialId);
      const listInOperations = await serviceOperation.findByAvailablePartialMaterialId(data.materialId);
      const lastOperation = listPreviouOperations[listPreviouOperations.length - 1];
      newOperation = await buildDataOutOperationProduct(data, listInOperations, lastOperation);
      const newSale = buildDataForRegisterSale(newOperation);
      const response = await Promise.all([serviceOperation.create(newOperation), service.create(newSale)]);
      res.status(201).json(response[0]);
    } catch (error) {
      console.error(error);
      // next(error);
    }
  }
);

router.patch(
  "/:id",
  // validatorHandler(getTodoSchema, 'params'),
  // validatorHandler(updateTodoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      console.log("note update!!", id, body);
      const rta = await service.update(id, body);
      const updatedSale = await service.findOne(id);
      const response = {
        update: true,
        updatedSale
      }
      res.json(response);
    } catch (error) {
      console.log(error);
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
      const deleteMaterial = await service.delete(id);
      res.status(201).json(deleteMaterial);
    } catch (error) {
      // next(error);
      console.error(error);
    }
  }
);

module.exports = router;
