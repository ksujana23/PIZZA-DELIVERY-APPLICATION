const Order = require("../models/Order");

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
      ingredients,
      customDetails,
    } = req.body;

    // -------------------------------------------------
    // BASIC VALIDATION
    // -------------------------------------------------

    if (!userId || !pizzaName || !quantity || totalPrice === undefined) {
      return res.status(400).json({
        message: "Missing order details",
      });
    }

    // -------------------------------------------------
    // CREATE ORDER
    // -------------------------------------------------

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
        pizzaName === "Custom Pizza"
          ? ingredients || []
          : [],
    });

    // -------------------------------------------------
    // SUCCESS
    // -------------------------------------------------

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
// GET ALL ORDERS
// =====================================================

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
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