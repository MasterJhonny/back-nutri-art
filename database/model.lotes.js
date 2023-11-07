const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaLotes = Schema({
    detail: {
        type: String,
        require: true    
    },
    count: {
        type: Number,
        require: true
    },
    measure: {
        type: String,
        require: true
    },
    costs: {
        type: [Number],
        require: true
    },
    import: {
        type: Number,
        require: true
    },
    lotSize: {
        type: Number,
        require: true,
    },
    materialId: {
        type: String,
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