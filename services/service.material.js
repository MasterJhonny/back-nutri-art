// const sequelize = require("../libs/sequelize");
// const { models } = require("../libs/sequelize");

const { ModelMaterial } = require("../database/database");

// const boom = require("@hapi/boom");

class MaterialService {
    constructor() {

    }
    async find() {
      const rta = await ModelMaterial.find();
      return rta;
    }
  
    async create(data) {
      const newTodo = await ModelMaterial.create(data);

      return { 
        create: true
      }
    }
  
    //   async find() {
    //     const rta = await models.User.findAll();
    //     return rta;
    //   }
  
    async findOne(id) {
      const material = await ModelMaterial.find({_id: id});
      console.log("🚀 ~ file: service.material.js:32 ~ MaterialService ~ findOne ~ material:", material)
      if(!material) {
        throw new Error('Ups, user not found');
      }
      return material[0];
    }
  
    async update(id, changes) {
      const rta = await ModelMaterial.findByIdAndUpdate(id, changes);
      return rta;
    }
  
    async delete(id) {
      const rta = await ModelMaterial.findByIdAndDelete(id);
      // console.log('delete, rta!!',rta)
      return {
        delete: true,
        id,
      }
    }
}
  
  module.exports = MaterialService;
  