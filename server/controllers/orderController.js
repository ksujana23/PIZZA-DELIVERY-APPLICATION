
const mongoose = require("mongoose");
const Order = require("../models/Order");

// Place a new order
const placeOrder = async (req, res) => {
  try {
    console.log("PLACE ORDER REQUEST:", req.body);

    const {
      userId,
      pizzaName,
      quantity,
      totalPrice,
      customDetails,
      ingredients,
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !pizzaName ||
      quantity === undefined ||
      totalPrice === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all required order details.",
      });
    }

    if (
      !Number.isFinite(Number(quantity)) ||
      Number(quantity) < 1 ||
      !Number.isFinite(Number(totalPrice)) ||
      Number(totalPrice) < 0
    ) {
      return res.status(400).json({
        message: "Invalid quantity or total price.",
      });
    }

    // Create order
    const newOrder = await Order.create({
      userId: String(userId),
      pizzaName: String(pizzaName),
      quantity: Number(quantity),
      totalPrice: Number(totalPrice),
      customDetails: customDetails || {},
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      status: "Pending",
    });

    console.log("ORDER SAVED SUCCESSFULLY:", newOrder._id);

    return res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);

    return res.status(500).json({
      message: "Failed to place order.",
      error: error.message,
    });
  }
};

// Get orders for a particular user
const getOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required.",
      });
    }

    const orders = await Order.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch orders.",
      error: error.message,
    });
  }
};

// Get all orders for admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch all orders.",
      error: error.message,
    });
  }
};

// Mark an order as delivered
const markAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status: "Delivered",
        deliveredAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      message: "Order marked as delivered.",
      order,
    });
  } catch (error) {
    console.error("MARK DELIVERED ERROR:", error);

    return res.status(500).json({
      message: "Failed to update order.",
      error: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getAllOrders,
  markAsDelivered,
};
