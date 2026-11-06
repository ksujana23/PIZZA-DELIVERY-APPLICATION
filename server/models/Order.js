
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
      enum: ["Pending", "Delivered"],
      default: "Pending",
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    // Supports custom pizza and recommendation details
    customDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
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
