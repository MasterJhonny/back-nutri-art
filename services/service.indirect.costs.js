const { ModelIndirectCost } = require("../database/database");

class IndirectCostService {
    constructor() {

    }
    async find() {
      const rta = await ModelIndirectCost.find();
      return rta;
    }
  
    async create(data) {
      const newTodo = await ModelIndirectCost.create(data);
      return { 
        create: true
      }
    }
  
    async findOne(id) {
      const material = await ModelIndirectCost.find({_id: id});
      console.log("🚀 ~ file: service.material.js:32 ~ MaterialService ~ findOne ~ material:", material)
      if(!material) {
        throw new Error('Ups, user not found');
      }
      return material[0];
    }
  
    async update(id, changes) {
      const rta = await ModelIndirectCost.findByIdAndUpdate(id, changes);
      return rta;
    }
  
    async delete(id) {
      const rta = await ModelIndirectCost.findByIdAndDelete(id);
      // console.log('delete, rta!!',rta)
      return {
        delete: true,
        id,
      }
    }
}
  
module.exports = IndirectCostService;