const Order = require("../models/Order");

// =====================================================
// NORMAL PIZZA INGREDIENTS
// =====================================================

const pizzaIngredients = {
  "Classic Margherita": {
    Cheese: 0.15,
    "Tomato Sauce": 0.1,
    Dough: 0.2,
    Basil: 0.02,
  },

  "Veggie Supreme": {
    Cheese: 0.15,
    "Tomato Sauce": 0.1,
    Dough: 0.2,
    Mushroom: 0.08,
    Onion: 0.05,
    Capsicum: 0.05,
    Corn: 0.05,
    Olives: 0.03,
  },

  "Pepperoni Feast": {
    Cheese: 0.15,
    "Tomato Sauce": 0.1,
    Dough: 0.2,
    Pepperoni: 0.1,
  },

  "Spicy Paneer Tikka": {
    Cheese: 0.15,
    "Tomato Sauce": 0.1,
    Dough: 0.2,
    Paneer: 0.1,
    Jalapeno: 0.04,
    Onion: 0.05,
  },

  "Four Cheese": {
    Cheese: 0.2,
    Dough: 0.2,
  },

  "BBQ Chicken": {
    Cheese: 0.15,
    Dough: 0.2,
    "BBQ Sauce": 0.1,
    Chicken: 0.12,
    Onion: 0.05,
  },

  "Corn & Cheese": {
    Cheese: 0.18,
    Dough: 0.2,
    Corn: 0.1,
  },

  "Mexican Fiesta": {
    Cheese: 0.15,
    "Tomato Sauce": 0.1,
    Dough: 0.2,
    Jalapeno: 0.04,
    Capsicum: 0.05,
    Onion: 0.05,
  },

  "Mushroom Delight": {
    Cheese: 0.15,
    Dough: 0.2,
    Mushroom: 0.12,
    Onion: 0.05,
  },

  "Tandoori Chicken": {
    Cheese: 0.15,
    Dough: 0.2,
    Chicken: 0.12,
    Onion: 0.05,
    Capsicum: 0.05,
  },
};

// =====================================================
// PLACE ORDER
// =====================================================

const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      pizzaName,
      quantity,
      totalPrice,
      customDetails,
      ingredients,
    } = req.body;

    // BASIC VALIDATION
    if (!userId || !pizzaName || !quantity || totalPrice === undefined) {
      return res.status(400).json({
        message: "Missing order details",
      });
    }

    // =================================================
    // CREATE ORDER
    // =================================================

    const order = await Order.create({
      userId,
      pizzaName,
      quantity,
      totalPrice,

      customDetails:
        pizzaName === "Custom Pizza"
          ? customDetails
          : undefined,

      ingredients:
        ingredients || [],
    });

    // SUCCESS
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Place order error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// GET ORDERS FOR CURRENT USER
// =====================================================

const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    // Check userId
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    // IMPORTANT:
    // Only return orders belonging to this user
    const orders = await Order.find({
      userId: userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  placeOrder,
  getOrders,
};