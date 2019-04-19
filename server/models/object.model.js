const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ObjectSchema = new Schema({
    object_id: {type: Number, required: true},
    object_type: {type: String, required: true},
    timestamp: {type: Number, required: true},
    changes: {type: String, required: true}
});

module.exports = mongoose.model('Object', ObjectSchema);