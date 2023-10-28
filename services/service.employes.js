const { ModelEmploye } = require("../database/database");

class MaterialService {
    constructor() {

    }
    async find() {
      const rta = await ModelEmploye.find();
      return rta;
    }
  
    async create(data) {
      const newTodo = await ModelEmploye.create(data);
      return { 
        create: true
      }
    }
  
    async findOne(id) {
      const material = await ModelEmploye.find({_id: id});
      console.log("🚀 ~ file: service.material.js:32 ~ MaterialService ~ findOne ~ material:", material)
      if(!material) {
        throw new Error('Ups, user not found');
      }
      return material[0];
    }
  
    async update(id, changes) {
      const rta = await ModelEmploye.findByIdAndUpdate(id, changes);
      return rta;
    }
  
    async delete(id) {
      const rta = await ModelEmploye.findByIdAndDelete(id);
      // console.log('delete, rta!!',rta)
      return {
        delete: true,
        id,
      }
    }
}
  
module.exports = MaterialService;
