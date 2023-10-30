const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movements = new Schema({
    amount: {
        type: Number,
        require: true,
        default: 0
    },
    currentUnitCost: {
        type: [Number],
        require: true,
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
    balances: movements,
    materialId: {
        type: String,
        require: true,
    },
    available: {
        type: Boolean,
    },
    partial: {
        type: Boolean,
    },
    partialQuantity: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = schemaOperations;