const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

// Protected test route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

module.exports = router;