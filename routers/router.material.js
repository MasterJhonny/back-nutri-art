const express = require('express');

const MaterialService = require('../services/service.material');
const LoteService = require('../services/service.lotes');

// const validatorHandler = require('./../middlewares/validator.handler');
// const { updateTodoSchema, createTodoSchema, getTodoSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new MaterialService();
const serviceLote = new LoteService();

router.get('/', async (req, res, next) => {
  try {
    const materials = await service.find();
    res.status(200).json(materials);
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
      console.log("🚀 ~ file: router.material.js:25 ~ id:", id)
      const material = await service.findOne(id);
      res.json(material);
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
      const material = req.body;
      // console.log("🚀 ~ file: router.material.js:40 ~ material:", material)
      const newMaterial = await service.create(material);
      console.log("🚀 ~ file: router.material.js:50 ~ newMaterial:", newMaterial);
      const newLote = {
        detail: material.article,
        count: 0,
        measure: material.unitMeasure,
        import: 0,
        lotSize: material.lotSize, 
        materialId: newMaterial.newMaterial._id, 
      }
      const rta = await serviceLote.create(newLote);
      res.status(201).json(newMaterial);
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
