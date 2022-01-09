// Iteration #1

const {model, Schema} = require('mongoose');

const droneSchema = new Schema({
    name: String,
    propellers: Number,
    maxSpeed: Number
});

const Drone = model('drones', droneSchema);

module.exports = Drone