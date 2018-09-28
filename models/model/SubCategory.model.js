const mongoose = require('mongoose');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({

	country_id: { type: Schema.Types.ObjectId, ref: 'CountryMaster', required: true },
	category_id: { type: Schema.Types.ObjectId, ref: 'CategoryMaster', required: true },
	parent_id: { type: Schema.Types.ObjectId, ref: 'SubCategory', default: null },
	name: { type: String, maxlength: 250, default: null },
	url: { type: String, maxlength: 250, unique: true, default: null },
	mysqlID: { type: Number, default: 0 }

});

SubCategorySchema.set('versionKey', false)

const SubCategory = connection.model('SubCategory', SubCategorySchema);
module.exports = SubCategory;
