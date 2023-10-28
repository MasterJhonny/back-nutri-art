const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const schemaMaterial = new Schema({
    article: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
    unitMeasure: {
        type: String,
        require: true,
    },
    countMin: {
        type: Number,
        require: true,
    },
    countMax: {
        type: Number,
        require: true,
    },
    method: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    stock: {
        type: Number,
        default: 0,
        get: (v) => {
            // Redondea el valor a 2 decimales antes de devolverlo
            return parseFloat(v);
        },
        set: (v) => {
            // Convierte el valor a un número de coma flotante
            return parseFloat(v);
        },
    },
    currentUnitCost: {
        type: Number,
        require: true,
        default: 0,
    },
    provider: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = schemaMaterial;