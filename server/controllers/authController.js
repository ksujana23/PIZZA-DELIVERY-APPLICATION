
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password"
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await User.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword
    });

    console.log("Registration successful:", user._id);
    console.log("Database:", User.db.name);
    console.log("Collection:", User.collection.name);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

// ================= LOGIN =================

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({
        message: "Please enter your name/email and password"
      });
    }

    const loginValue = name.trim();

    console.log("========== LOGIN DEBUG ==========");
    console.log("Received login value:", loginValue);
    console.log("Database:", User.db.name);
    console.log("Collection:", User.collection.name);

    // Find user by name OR email
    const user = await User.findOne({
      $or: [
        {
          name: {
            $regex: new RegExp(
              "^" + loginValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$",
              "i"
            )
          }
        },
        {
          email: loginValue.toLowerCase()
        }
      ]
    });

    console.log(
      "User search result:",
      user ? user._id.toString() : "NOT FOUND"
    );

    console.log("================================");

    if (!user) {
      return res.status(404).json({
        message: "User not found. Check your registered name or email."
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password"
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    console.log("LOGIN SUCCESS:", user._id.toString());

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};

// ================= EXPORT =================

module.exports = {
  registerUser,
  loginUser
};
