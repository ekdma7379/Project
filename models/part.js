var mongoose = require('mongoose');
var db = require('./db');

var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var partSchema = new Schema({
		_id: Number,
		partName: String
})

partSchema.plugin(autoIncrement.plugin, {model: 'part', field: '_id', startAt: 1, incrementBy: 1});


var partModel = db.model('part', partSchema);

module.exports = { partModel: partModel, partSchema: partSchema};
