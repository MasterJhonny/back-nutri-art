const { ModelLotes } = require("../database/database");

class LotesService {
    constructor() {

    }
    async find() {
      const rta = await ModelLotes.find();
      return rta;
    }
  
    async create(data) {
      const newLote = await ModelLotes.create(data);
      return { 
        create: true
      }
    }
  
    async findOne(id) {
      const lote = await ModelLotes.find({ _id: id });
      console.log("🚀 ~ file: service.lote.js:32 ~ LotesService ~ findOne ~ lote:", lote)
      if(!lote) {
        throw new Error('Ups, user not found');
      }
      return lote[0];
    }

    async findByMaterialId(id) {
      const lotes = await ModelLotes.find({ materialId: id });
      if(!lotes) {
        throw new Error('Ups, user not found');
      }
      return lotes;
    }
  
    async update(id, changes) {
      const rta = await ModelLotes.findByIdAndUpdate(id, changes);
      return rta;
    }
  
    async delete(id) {
      const rta = await ModelLotes.findByIdAndDelete(id);
      // console.log('delete, rta!!',rta)
      return {
        delete: true,
        id,
      }
    }
}
  
module.exports = LotesService;
