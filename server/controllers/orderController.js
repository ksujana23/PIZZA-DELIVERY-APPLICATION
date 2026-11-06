
const Order = require("../models/Order");
const mongoose = require("mongoose");

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
    console.log("========== NEW ORDER REQUEST ==========");
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    console.log("Database:", Order.db.name);
    console.log("Collection:", Order.collection.name);

    const {
      userId,
      pizzaName,
      quantity,
      totalPrice,
      customDetails,
      ingredients,
    } = req.body;

    // Validate required fields
    if (!userId || !pizzaName || quantity === undefined || totalPrice === undefined) {
      return res.status(400).json({
        message: "Missing order details",
      });
    }

    // Validate MongoDB user ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(totalPrice);

    if (
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity < 1 ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      return res.status(400).json({
        message: "Invalid quantity or total price",
      });
    }

    // Create order
    const order = await Order.create({
      userId: userId,
      pizzaName: pizzaName.trim(),
      quantity: parsedQuantity,
      totalPrice: parsedPrice,

      // Preserve details for Custom Pizza,
      // Recommended Pizza and Mystery Pizza.
      customDetails: customDetails || undefined,

      ingredients: Array.isArray(ingredients)
        ? ingredients
        : [],

      status: "Pending",
    });

    console.log("ORDER SAVED SUCCESSFULLY:", order._id);
    console.log("=======================================");

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("========== ORDER ERROR ==========");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

// =====================================================
// GET CUSTOMER ORDERS
// =====================================================

const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const orders = await Order.find({
      userId: userId,
      status: "Pending",
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(orders);

  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// ADMIN - GET ALL ORDERS
// =====================================================

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);

  } catch (error) {
    console.error("Get all orders error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// ADMIN - MARK ORDER AS DELIVERED
// =====================================================

const markAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "Delivered" },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order marked as delivered",
      order,
    });

  } catch (error) {
    console.error("Mark delivered error:", error);

    return res.status(500).json({
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
  getAllOrders,
  markAsDelivered,
};
