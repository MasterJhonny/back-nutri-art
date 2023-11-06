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
      console.log("🚀 ~ file: service.lotes.js:14 ~ LotesService ~ create ~ newLote:", newLote);
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
      console.log("🚀 ~ file: service.lote.js:32 ~ LotesService ~ findByMaterialId ~ lote:", lotes)
      if(!lotes) {
        throw new Error('Ups, user not found');
      }
      return lotes;
    }
  
    async update(id, changes) {
      const rta = await ModelLotes.findByIdAndUpdate(id, changes);
      console.log("🚀 ~ file: service.lotes.js:31 ~ LotesService ~ update ~ rta:", rta);
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
