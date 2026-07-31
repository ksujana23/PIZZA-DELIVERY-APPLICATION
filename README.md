# 🍕 Slice & Co. — Pizza Delivery Application

A full-stack pizza ordering web application built using **React, Node.js, Express.js, and MongoDB** that allows users to browse pizzas, build custom pizzas, simulate payments, and track orders in real time.

This project was developed as a **Level 3 Full Stack Web Development Project** inspired by a Pizza Delivery Application workflow.

## Project Link

https://pizza-delivery-application-three.vercel.app?utm_source=chatgpt.com

---

## 📌 Project Overview

Slice & Co. is an interactive pizza ordering platform where users can:

- Create an account and log in securely
- Browse available pizzas from the menu
- Build a fully custom pizza by selecting ingredients
- Simulate payment checkout
- Place orders from menu or custom builder
- View order details and delivery status

The application demonstrates **frontend development, backend integration, routing, authentication flow, state management, and local storage handling**.

---

## 🚀 Features Implemented

### 👤 Authentication System

✔ User Registration  
✔ User Login  
✔ Backend authentication API integration  
✔ Token storage using localStorage  
✔ Login state handling  
✔ Dynamic navbar after login/logout  

---

### 🍕 Pizza Menu Dashboard

✔ Display available pizza varieties  
✔ Pizza cards with images, description and price  
✔ Order any pizza directly  
✔ Payment popup simulation before ordering  

---

### 🛠 Build Your Own Pizza

Users can fully customize pizzas by selecting:

#### Step 1 — Choose Pizza Base (5 options)

- Cheese Burst  
- Gluten Free  
- Thick Crust  
- Thin Crust  
- Whole Wheat  

#### Step 2 — Select Sauce (5 options)

- Alfredo White  
- BBQ  
- Classic Tomato  
- Pesto Basil  
- Spicy Arrabbiata  

#### Step 3 — Select Cheese

- Cheddar  
- Mozzarella  
- Parmesan  
- Vegan Cheese  

#### Step 4 — Add Veggies (Optional)

- Bell Peppers  
- Black Olives  
- Jalapenos  
- Mushrooms  
- Onions  
- Spinach  
- Sweet Corn  
- Tomatoes  

---

### 💳 Payment System (Simulation)

✔ Secure checkout popup  
✔ Dummy card input fields  
✔ Payment processing simulation  
✔ Order confirmation after payment  

(Currently implemented as test payment simulation)

---

### 📦 Order Tracking System

The application supports two types of orders:

### Menu Order

When user orders directly from menu:

- Selected pizza is stored
- Order appears in My Orders page

### Custom Pizza Order

When user builds custom pizza:

- Selected ingredients are stored
- Custom pizza details appear in My Orders page

---

### 🔄 Dynamic Order Handling

The system automatically detects whether the user:

- Ordered from menu OR
- Built custom pizza

and displays correct order information accordingly.

---

## 🖥 Tech Stack

### Frontend

- React.js
- React Router DOM
- CSS3
- JavaScript (ES6)
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Tools Used

- VS Code
- Git & GitHub
- Postman
- LocalStorage API

---

## 📂 Project Structure

```bash
client/
│
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Features.jsx
│   ├── PizzaSection.jsx
│   └── Footer.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Auth.jsx
│   ├── PizzaMenu.jsx
│   ├── BuildPizza.jsx
│   ├── Orders.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── App.jsx
├── App.css
└── index.css


server/
│
├── routes/
│   ├── authRoutes.js
│   ├── pizzaRoutes.js
│   └── orderRoutes.js
│
├── controllers/
├── models/
├── server.js
└── .env
```

---

## ⚙️ Application Flow

```text
User Register/Login
        ↓
Pizza Menu Dashboard
        ↓
Choose Option

1. Order From Menu
        ↓
Payment Popup
        ↓
Order Stored
        ↓
My Orders Page


OR


2. Build Custom Pizza
        ↓
Choose Base
Choose Sauce
Choose Cheese
Choose Veggies
        ↓
Payment Popup
        ↓
Custom Order Stored
        ↓
My Orders Page
```

---

## 📸 Main Pages

- Home Page
- Authentication Page
- Pizza Menu Dashboard
- Build Pizza Page
- Payment Popup
- Orders Tracking Page

---

## 🎯 Learning Outcomes

Through this project I practiced:

- React component architecture
- React state management using useState
- React Router navigation
- API integration using Axios
- Node.js backend development
- Express routing
- MongoDB database connection
- LocalStorage data persistence
- Dynamic conditional rendering
- UI/UX design implementation

---

## 🔮 Future Improvements

The original Level 3 project includes additional advanced features.

Possible future upgrades:

- Admin Dashboard
- Inventory Management System
- Razorpay Payment Gateway Integration
- Email Verification System
- Forgot Password System
- Stock Monitoring
- Admin Order Status Updates
- Real-time Order Tracking using Socket.IO

---

## 👩‍💻 Developed By

**Sujana Kasarapu**

B.Tech Computer Science Engineering  
GITAM University  

GitHub: (your github link)  
LinkedIn: (your linkedin link)

---

## ⭐ Project Status

✅ Completed and Working Successfully

Current version supports:

- Authentication
- Pizza ordering
- Custom pizza builder
- Payment simulation
- Order management
- Responsive UI

---
