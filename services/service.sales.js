const { ModelSales } = require("../database/database");

class SaleService {
    constructor() {

    }
    async find() {
      const rta = await ModelSales.find();
      return rta;
    }
  
    async create(data) {
      const sale = await ModelSales.create(data);
      return { 
        create: true,
        sale
      }
    }
  
    async findOne(id) {
      const sale = await ModelSales.find({_id: id});
      console.log("🚀 ~ file: service.sale.js:32 ~ saleService ~ findOne ~ sale:", sale)
      if(!sale) {
        throw new Error('Ups, user not found');
      }
      return sale[0];
    }
  
    async update(id, changes) {
      const rta = await ModelSales.findByIdAndUpdate(id, changes);
      return rta;
    }
  
    async delete(id) {
      const rta = await ModelSales.findByIdAndDelete(id);
      // console.log('delete, rta!!',rta)
      return {
        delete: true,
        id,
      }
    }
}
  
module.exports = SaleService;
