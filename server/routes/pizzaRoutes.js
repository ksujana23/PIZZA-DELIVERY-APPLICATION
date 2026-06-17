console.log("SERVER FILE RUNNING");
const express = require("express");
console.log("PIZZA ROUTES LOADED");

const router = express.Router();

const {
  addPizza,
  getPizzas,
} = require("../controllers/pizzaController");

// Add pizza route
router.post("/add", addPizza);

// Get all pizzas route
router.get("/", getPizzas);

module.exports = router;