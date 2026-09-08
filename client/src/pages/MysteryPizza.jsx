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

import "./MysteryPizza.css";

function MysteryPizza() {
  const navigate = useNavigate();

  const [mysteryPizza, setMysteryPizza] = useState(null);
  const [revealing, setRevealing] = useState(false);
  const [lastPizzaIndex, setLastPizzaIndex] = useState(null);

  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);

  const pizzas = [
    {
      name: "Classic Margherita",
      price: 399,
      image: margherita,
      desc: "Fresh mozzarella, tomato sauce and fragrant basil.",
    },
    {
      name: "Veggie Supreme",
      price: 449,
      image: veggie,
      desc: "A colourful combination of fresh vegetables and cheese.",
    },
    {
      name: "Pepperoni Feast",
      price: 599,
      image: pepperoni,
      desc: "Spicy pepperoni loaded with bubbling mozzarella.",
    },
    {
      name: "Spicy Paneer Tikka",
      price: 649,
      image: paneer,
      desc: "Paneer tikka, jalapenos and onions with a spicy kick.",
    },
    {
      name: "Four Cheese",
      price: 799,
      image: fourcheese,
      desc: "A rich and creamy combination of four delicious cheeses.",
    },
    {
      name: "BBQ Chicken",
      price: 849,
      image: bbq,
      desc: "Smoky BBQ chicken with red onions and fresh cilantro.",
    },
    {
      name: "Corn & Cheese",
      price: 999,
      image: corncheese,
      desc: "Sweet corn covered with a delicious creamy cheese blend.",
    },
    {
      name: "Mexican Fiesta",
      price: 1049,
      image: mexican,
      desc: "Jalapenos, capsicum and Mexican herbs with melted cheese.",
    },
    {
      name: "Mushroom Delight",
      price: 1199,
      image: mushroom,
      desc: "Fresh mushrooms, onions and mozzarella with an earthy flavour.",
    },
    {
      name: "Tandoori Chicken",
      price: 1249,
      image: tandoorichicken,
      desc: "Smoky tandoori chicken with Indian spices and mozzarella.",
    },
  ];

  const revealPizza = () => {
    setRevealing(true);
    setMysteryPizza(null);

    setTimeout(() => {
      let randomIndex;

      do {
        randomIndex = Math.floor(Math.random() * pizzas.length);
      } while (
        pizzas.length > 1 &&
        randomIndex === lastPizzaIndex
      );

      setLastPizzaIndex(randomIndex);
      setMysteryPizza(pizzas[randomIndex]);
      setRevealing(false);
    }, 1200);
  };

  // Open checkout
  const orderMysteryPizza = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    setShowPayment(true);
  };

  // Complete payment
  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      localStorage.removeItem("customOrder");

      localStorage.setItem(
        "currentOrder",
        JSON.stringify(mysteryPizza)
      );

      console.log(
        "Mystery order saved:",
        localStorage.getItem("currentOrder")
      );

      setProcessing(false);
      setShowPayment(false);

      navigate("/orders");
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <section className="mystery-page">
        <div className="mystery-container">

          {/* HEADING */}
          <div className="mystery-heading">
            <div className="gift-icon">🎁</div>

            <h1>Mystery Pizza</h1>

            <p>
              Can't decide what to order? Let fate choose your next pizza.
            </p>
          </div>

          {/* START */}
          {!mysteryPizza && !revealing && (
            <div className="mystery-start-card">

              <div className="mystery-pizza-icon">
                🍕
              </div>

              <h2>Feeling adventurous?</h2>

              <p>
                We'll secretly pick one pizza from our menu.
                You won't know which one until the big reveal!
              </p>

              <button
                className="reveal-button"
                onClick={revealPizza}
              >
                ✨ Reveal My Mystery Pizza
              </button>

            </div>
          )}

          {/* REVEALING */}
          {revealing && (
            <div className="revealing-card">

              <div className="mystery-loader">
                🎁
              </div>

              <h2>
                Choosing your mystery pizza...
              </h2>

              <p>
                Something delicious is coming!
              </p>

            </div>
          )}

          {/* RESULT */}
          {mysteryPizza && !revealing && (
            <div className="mystery-result">

              <div className="surprise-title">
                ✨ SURPRISE! ✨
              </div>

              <div className="mystery-result-card">

                <div className="mystery-image">
                  <img
                    src={mysteryPizza.image}
                    alt={mysteryPizza.name}
                  />
                </div>

                <div className="mystery-details">

                  <span className="mystery-badge">
                    🎁 Your Mystery Pick
                  </span>

                  <h2>
                    {mysteryPizza.name}
                  </h2>

                  <h3>
                    ₹{mysteryPizza.price}
                  </h3>

                  <p>
                    {mysteryPizza.desc}
                  </p>

                  <button
                    className="mystery-order-button"
                    onClick={orderMysteryPizza}
                  >
                    🛒 Order My Mystery Pizza
                  </button>

                  <button
                    className="try-again-button"
                    onClick={revealPizza}
                  >
                    🎲 Surprise Me Again
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>
      </section>

      {/* PAYMENT POPUP */}
      {showPayment && (
        <div className="payment-overlay">

          <div className="payment-box">

            <h2>Secure Checkout</h2>

            <p>
              {mysteryPizza?.name}
            </p>

            <p>
              Total ₹{mysteryPizza?.price}
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
                : `Pay ₹${mysteryPizza?.price}`}
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

export default MysteryPizza;