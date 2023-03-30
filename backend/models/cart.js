const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        buyerContact:{
            type: String,
            required: true,
            unique: true
        },
        cartProducts:{
            type:[{}],
            required: true}
    }, {timestamps: true}
);

module.exports = mongoose.model("Cart", cartSchema);