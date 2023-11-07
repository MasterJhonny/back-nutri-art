const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaEmploye = Schema({
    fullName: {
        type: String,
        require: true    
    },
    role: {
        type: String,
        require: true
    },
    hours: {
        type: Number,
        require: true,
        default: 40,
    },
    salary: {
        type: Number,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = schemaEmploye;