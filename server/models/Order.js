const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    pizzaName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    customDetails: {
      base: {
        type: String,
      },

      sauce: {
        type: String,
      },

      cheese: {
        type: String,
      },

      veggies: {
        type: [String],
        default: [],
      },
    },

    ingredients: [
      {
        name: {
          type: String,
        },

        quantity: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);