const express = require('express');
const LoteService = require('../services/service.lotes');
const { filterSetNumberLot } = require('../func');

const router = express.Router();
const service = new LoteService();

router.get('/', async (req, res, next) => {
  try {
    const lotes = await service.find();
    res.status(200).json(lotes);
  } catch (error) {
    // next(error);
    console.error(error);
  }
});

router.get('/set-lotes-number/:numberLot', async (req, res, next) => {
    try {
      const { numberLot } = req.params;
      console.log("🚀 ~ file: router.lotes.js:21 ~ router.get ~ numberLot:", numberLot);
      const lotes = await service.find();
      const setLotes = filterSetNumberLot(lotes, parseInt(numberLot));
      res.status(200).json(setLotes);
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
      console.log("🚀 ~ file: router.lotes.js:25 ~ id:", id)
      const lotes = await service.findByMaterialId(id);
      res.json(lotes);
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
    const updateLote = await service.findOne(id);
    res.json(updateLote);
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
    const deletelote = await service.delete(id);
    res.status(201).json(deletelote);
  } catch (error) {
    // next(error);
    console.error(error);
  }
}
);

module.exports = router;