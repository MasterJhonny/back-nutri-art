const { ModelOperations } = require("../database/database");

// const boom = require("@hapi/boom");

class OperationService {
    constructor() {

    }
    async find() {
      const rta = await ModelOperations.find();
      return rta;
    }

    async findByMaterialId(id) {
      const operations = await ModelOperations.find({ materialId: id });
      if(!operations) {
        throw new Error('Ups, user not found');
      }
      return operations;
    }

    async findByAvailablePartialMaterialId(id) {
      const operations = await ModelOperations.find({ materialId: id, $or: [{available: true, }, { partial: true }]});
      if(!operations) {
        throw new Error('Ups, user not found');
      }
      return operations;
    }
  
    async create(data) {
      const registerOperation = await ModelOperations.create(data);
      console.log("🚀 ~ file: service.operations.js:16 ~ OperationService ~ create ~ registerOperation:", registerOperation);
      return { 
        create: true
      }
    }

    async update(id, changes) {
      const updateOperation = await ModelOperations.findByIdAndUpdate(id, changes);
      console.log("🚀 ~ file: service.operations.js:33 ~ OperationService ~ update ~ updateOperation:", updateOperation);
      return { 
        create: true
      }
    }
  
    async delete(id) {
      const rta = await ModelOperations.findByIdAndDelete(id);
      console.log('delete, rta!!',rta)
      return {
        delete: true,
        id,
      }
    }
    async findByMaterialIdByType(id, typeOper) {
      const operations = await ModelOperations.find({ materialId: id, type: typeOper });
      if(!operations) {
        throw new Error('Ups, user not found');
      }
      return operations;
    }
}
  
  module.exports = OperationService;