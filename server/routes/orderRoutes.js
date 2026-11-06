const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getOrders,
  getAllOrders,
  markAsDelivered,
} = require("../controllers/orderController");

// =====================================================
// CUSTOMER PLACES ORDER
// =====================================================

router.post("/place", placeOrder);


// =====================================================
// CUSTOMER GETS THEIR ORDERS
// =====================================================

router.get("/", getOrders);


// =====================================================
// ADMIN GETS ALL ORDERS
// =====================================================

router.get("/admin/all", getAllOrders);


// =====================================================
// ADMIN MARKS ORDER AS DELIVERED
// =====================================================

router.put(
  "/admin/deliver/:orderId",
  markAsDelivered
);


module.exports = router;