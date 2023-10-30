const express = require('express');

const IndirectCostService = require('../services/service.indirect.costs');
// const validatorHandler = require('./../middlewares/validator.handler');
// const { updateTodoSchema, createTodoSchema, getTodoSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new IndirectCostService();

router.get('/', async (req, res, next) => {
  try {
    const inCosts = await service.find();
    res.status(200).json(inCosts);
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
      console.log("🚀 ~ file: router.inCost.js:25 ~ id:", id)
      const inCost = await service.findOne(id);
      res.json(inCost);
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
      const inCost = req.body;
      console.log("🚀 ~ file: router.inCost.js:40 ~ inCost:", inCost)
      const newInCost = await service.create(inCost);
      res.status(201).json(newInCost);
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