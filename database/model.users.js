const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaUser = Schema({
    name: {
        type: String,
        require: true    
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    cloud_avatar_id: {
        type: String,
        require: true
    },
    schedule: {
        type: String,
    },
    cloud_schedule_id: {
        type: String,
    }
})


module.exports = schemaUser;