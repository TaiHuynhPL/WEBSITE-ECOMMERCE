const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        idProduct: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalValue: {
      type: Number,
      required: true,
    },
    delivery: {
      type: String,
      enum: ["Waiting for progressing", "Economical delivery", "Fast delivery"],
      default: "Waiting for progressing",
    },
    status: {
      type: String,
      enum: ["Waiting for pay", "Delivering", "Delivered"],
      default: "Waiting for pay",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requred: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
