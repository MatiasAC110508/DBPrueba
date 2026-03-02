const mongoose = require('mongoose');

const DeletedProductSchema = new mongoose.Schema({
    productId: {type: String, required: true},
    deletedProduct: {type: String, required: true},
    date: {type: Date, required: true},
    deletedBy: {type: String, required: true}
});

module.exports = mongoose.model ('DeletedProductSchema', DeletedProductSchema); 