const mongoose = require('mongoose');

const { defaultLotSize } = require("../const");

const Schema = mongoose.Schema;

const schemaLotes = Schema({
    directMaterialCost: {
        type: Number,
        require: true,
    },
    workforceCost: {
        type: Number,
        require: true,
    },
    indirectCost: {
        type: Number,
        require: true,
    },
    productionCost: {
        type: Number,
        require: true, 
    },
    lotSize: {
        type: Number,
        require: true,
        default: defaultLotSize,
    },
    unitCost: {
        type: Number,
        require: true,
    },
    numberLotSet: {
        type: Number,
        require: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = schemaLotes;