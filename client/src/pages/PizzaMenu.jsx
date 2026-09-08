import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import margherita from "../assets/margherita.png";
import pepperoni from "../assets/pepperoni.png";
import veggie from "../assets/veggie.png";
import paneer from "../assets/paneer.png";
import fourcheese from "../assets/fourcheese.png";
import bbq from "../assets/bbqchicken.png";

import corncheese from "../assets/corncheese.png";
import mexican from "../assets/mexican.png";
import mushroom from "../assets/mushroom.png";
import tandoorichicken from "../assets/tandoorichicken.png";

function PizzaMenu() {
  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [processing, setProcessing] = useState(false);

  // When user clicks Order Now
  const handleOrder = (pizza) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    setSelectedPizza(pizza);
    setShowPayment(true);
  };

  // After payment
  const handlePayment = () => {
  setProcessing(true);

  setTimeout(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/orders/place",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: token,
            pizzaName: selectedPizza.name,
            quantity: 1,
            totalPrice: selectedPizza.price,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to place order");
        setProcessing(false);
        return;
      }

      console.log("Order saved to MongoDB:", data);

      localStorage.removeItem("customOrder");

      localStorage.setItem(
        "currentOrder",
        JSON.stringify(selectedPizza)
      );

      setProcessing(false);
      setShowPayment(false);

      navigate("/orders");
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing the order");
      setProcessing(false);
    }
  }, 2000);
};

  const pizzas = [
    {
      name: "Classic Margherita",
      price: 399,
      desc: "Fresh mozzarella, tangy tomato sauce and fragrant basil on a thin crust.",
      image: margherita
    },
    {
      name: "Veggie Supreme",
      price: 449,
      desc: "Bell peppers, mushrooms, onions, olives and sweet corn galore.",
      image: veggie
    },
    {
      name: "Pepperoni Feast",
      price: 599,
      desc: "Loaded with spicy pepperoni and bubbling mozzarella cheese.",
      image: pepperoni
    },
    {
      name: "Spicy Paneer Tikka",
      price: 649,
      desc: "Marinated paneer, jalapenos and onions with a spicy kick.",
      image: paneer
    },
    {
      name: "Four Cheese",
      price: 799,
      desc: "A creamy blend of mozzarella, cheddar, parmesan and vegan cheese.",
      image: fourcheese
    },
    {
      name: "BBQ Chicken",
      price: 849,
      desc: "Smoky BBQ sauce, grilled chicken, red onion and fresh cilantro.",
      image: bbq
    },
    {
      name: "Corn & Cheese",
      price: 999,
      desc: "Sweet corn, mozzarella and a creamy cheese blend on a golden crust.",
      image: corncheese
    },
    {
      name: "Mexican Fiesta",
      price: 1049,
      desc: "Jalapenos, capsicum, onions and Mexican herbs with melted cheese.",
      image: mexican
    },
    {
      name: "Mushroom Delight",
      price: 1199,
      desc: "Fresh mushrooms, onions and mozzarella for a rich earthy flavour.",
      image: mushroom
    },
    {
      name: "Tandoori Chicken",
      price: 1249,
      desc: "Smoky tandoori chicken, onions, capsicum and mozzarella with Indian spices.",
      image: tandoorichicken
    }
  ];

  return (
    <>
      <Navbar />

      <section className="menu-page">

        <div className="menu-header">
          <div>
            <h1>Our Menu</h1>
            <p>Pick a chef's favorite or craft your own.</p>
          </div>

          <button
            className="build-btn"
            onClick={() => navigate("/build")}
          >
            Build your own
          </button>
        </div>

        <div className="menu-grid">

          {pizzas.map((pizza, index) => (
            <div
              key={index}
              className="menu-card"
            >
              <img
                src={pizza.image}
                alt={pizza.name}
              />

              <div className="menu-content">

                <div className="menu-top-row">
                  <h3>{pizza.name}</h3>
                  <span>₹{pizza.price}</span>
                </div>

                <p>{pizza.desc}</p>

                <button
                  className="order-now"
                  onClick={() => handleOrder(pizza)}
                >
                  Order now
                </button>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* PAYMENT POPUP */}
      {showPayment && (
        <div className="payment-overlay">

          <div className="payment-box">

            <h2>Secure Checkout</h2>

            <p>{selectedPizza?.name}</p>

            <p>
              Total ₹{selectedPizza?.price}
            </p>

            <input
              placeholder="4242 4242 4242 4242"
            />

            <div className="payment-row">

              <input
                placeholder="12/30"
              />

              <input
                placeholder="123"
              />

            </div>

            <button onClick={handlePayment}>
              {processing
                ? "Processing payment..."
                : `Pay ₹${selectedPizza?.price}`}
            </button>

            <button
              onClick={() => setShowPayment(false)}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </>
  );
}

export default PizzaMenu;