const express = require('express');

const EmployeService = require('../services/service.employes');
// const validatorHandler = require('./../middlewares/validator.handler');
// const { updateTodoSchema, createTodoSchema, getTodoSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new EmployeService();

router.get('/', async (req, res, next) => {
  try {
    const employes = await service.find();
    res.status(200).json(employes);
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
      console.log("🚀 ~ file: router.employe.js:25 ~ id:", id)
      const employe = await service.findOne(id);
      res.json(employe);
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
      const employe = req.body;
      console.log("🚀 ~ file: router.employe.js:40 ~ employe:", employe)
      const newEmploye = await service.create(employe);
      res.status(201).json(newEmploye);
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