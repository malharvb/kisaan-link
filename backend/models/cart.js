const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        buyerId: {
            type: String,
            required: true
        },
        cartProducts:{
            type:[{name: String, quantity: String, cost: String, image: String}],
            required: true}
    }, {timestamps: true }
);

module.exports = mongoose.model("Buyer", buyerSchema);