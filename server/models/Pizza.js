const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true,
    },

    base: {
      type: [String],   // options
      required: true,
    },

    sauce: {
      type: [String],   // options
      required: true,
    },

    cheese: {
      type: [String],   // options
      required: true,
    },

    veggies: {
      type: [String],   // options
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pizza", pizzaSchema);