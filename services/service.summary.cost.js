// const sequelize = require("../libs/sequelize");
// const { models } = require("../libs/sequelize");

const { ModelSummaryCost } = require("../database/database");

// const boom = require("@hapi/boom");

class SummaryCostService {
    constructor() {

    }
    async find() {
      const rta = await ModelSummaryCost.find();
      return rta;
    }
  
    async create(data) {
      const summary = await ModelSummaryCost.create(data);
      return { 
        create: true,
        summary
      }
    }
  
    async findOne(id) {
      const material = await ModelSummaryCost.find({_id: id});
      console.log("🚀 ~ file: service.material.js:32 ~ MaterialService ~ findOne ~ material:", material)
      if(!material) {
        throw new Error('Ups, user not found');
      }
      return material[0];
    }
  
    async update(id, changes) {
      const rta = await ModelSummaryCost.findByIdAndUpdate(id, changes);
      return rta;
    }
  
    async delete(id) {
      const rta = await ModelSummaryCost.findByIdAndDelete(id);
      // console.log('delete, rta!!',rta)
      return {
        delete: true,
        id,
      }
    }
}
  
module.exports = SummaryCostService;
