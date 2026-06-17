import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import margherita from "../assets/margherita.png";
import pepperoni from "../assets/pepperoni.png";
import veggie from "../assets/veggie.png";
import paneer from "../assets/paneer.png";
import fourcheese from "../assets/fourcheese.png";
import bbq from "../assets/bbqchicken.png";

function PizzaMenu() {

  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [processing, setProcessing] = useState(false);

const handleOrder = (pizza) => {

  localStorage.removeItem("customOrder");

  localStorage.setItem(
    "currentOrder",
    JSON.stringify(pizza)
  );

  navigate("/orders");
};


const handlePayment = () => {
  setProcessing(true);

  setTimeout(() => {
    const oldOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      ...selectedPizza,
      status: "Preparing 🍕",
      time: "25 mins"
    };

    oldOrders.push(newOrder);

    localStorage.setItem(
      "orders",
      JSON.stringify(oldOrders)
    );

    setProcessing(false);
    setShowPayment(false);

    navigate("/orders");
  }, 2000);
};

  const pizzas = [
    {
      name: "Classic Margherita",
      price: 299,
      desc: "Fresh mozzarella, tangy tomato sauce and fragrant basil on a thin crust.",
      image: margherita
    },
    {
      name: "Veggie Supreme",
      price: 349,
      desc: "Bell peppers, mushrooms, onions, olives and sweet corn galore.",
      image: veggie
    },
    {
      name: "Pepperoni Feast",
      price: 399,
      desc: "Loaded with spicy pepperoni and bubbling mozzarella cheese.",
      image: pepperoni
    },
    {
      name: "Spicy Paneer Tikka",
      price: 399,
      desc: "Marinated paneer, jalapenos and onions with a spicy kick.",
      image: paneer
    },
    {
      name: "Four Cheese",
      price: 429,
      desc: "A creamy blend of mozzarella, cheddar, parmesan and vegan cheese.",
      image: fourcheese
    },
    {
      name: "BBQ Chicken",
      price: 449,
      desc: "Smoky BBQ sauce, grilled chicken, red onion and fresh cilantro.",
      image: bbq
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
            <div key={index} className="menu-card">

              <img src={pizza.image} alt="pizza" />

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
    
    {showPayment && (
  <div className="payment-overlay">

    <div className="payment-box">

      <h2>Secure Checkout</h2>

      <p>{selectedPizza?.name}</p>
      <p>Total ₹{selectedPizza?.price}</p>

      <input
        placeholder="4242 4242 4242 4242"
      />

      <div className="payment-row">
        <input placeholder="12/30" />
        <input placeholder="123" />
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