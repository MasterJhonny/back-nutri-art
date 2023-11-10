const mongoose = require('mongoose');

const { defaultLotSize } = require("../const");

const Schema = mongoose.Schema;

const schemaSales = Schema({
    amount: {
        type: Number,
        require: true,
    },
    currentUnitCost: {
        type: [Object],
        require: true,
    },
    productionCost: {
        type: Number,
        require: true, 
    },
    salePrice: {
        type: [Number],
        require: true,
    },
    salesAmount: {
        type: Number,
        require: true,
    },
    invoicePrice: {
        type: [Number],
        require: true,
    },
    invoiceAmount: {
        type: Number,
        require: true,
    },
    invoiceDate: {
        type: Date,
    },
    businessName: {
        type: String,
    },
    nit: {
        type: String,
    },
    invoiceStatus: {
        type: Boolean,
        require: true,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = schemaSales;