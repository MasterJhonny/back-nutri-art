const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movements = new Schema({
    amount: {
        type: Number,
        require: true,
        default: 0
    },
    currentUnitCost: {
        type: Number,
        require: true,
        default: 0
    },
    total: {
        type: Number,
        require: true,
        default: 0
    }
});

const balances = new Schema({
    amount: {
        type: Number,
        require: true,
        default: 0
    },
    currentUnitCost: {
        type: Number,
        require: true,
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
    total: {
        type: Number,
        require: true,
        default: 0
    }
});

const schemaOperations = new Schema({
    date: {
        type: Date,
        require: true,
    },
    detail: {
        type: String,
        require: true,
    },
    type: {
        type: Number,
        require: true,
    },
    record: movements,
    balances: balances,
    materialId: {
        type: String,
        require: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = schemaOperations;