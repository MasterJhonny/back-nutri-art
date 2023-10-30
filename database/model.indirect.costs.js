const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaIndirectCost = Schema({
    detail: {
        type: String,
        require: true    
    },
    amountForLiter: {
        type: Number,
        require: true
    },
    amountMoth: {
        type: Number,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = schemaIndirectCost;