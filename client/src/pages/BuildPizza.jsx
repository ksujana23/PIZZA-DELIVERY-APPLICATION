import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function BuildPizza() {

  const [base, setBase] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [cheese, setCheese] = useState(null);
  const [veggies, setVeggies] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // OPTIONS

  const baseOptions = [
    { name: "Cheese Burst", price: 180 },
    { name: "Gluten Free", price: 200 },
    { name: "Thick Crust", price: 130 },
    { name: "Thin Crust", price: 120 },
    { name: "Whole Wheat", price: 140 }
  ];

  const sauceOptions = [
    { name: "Alfredo White", price: 55 },
    { name: "BBQ", price: 45 },
    { name: "Classic Tomato", price: 30 },
    { name: "Pesto Basil", price: 50 },
    { name: "Spicy Arrabbiata", price: 40 }
  ];

  const cheeseOptions = [
    { name: "Cheddar", price: 65 },
    { name: "Mozzarella", price: 60 },
    { name: "Parmesan", price: 80 },
    { name: "Vegan Cheese", price: 90 }
  ];

  const veggieOptions = [
    { name: "Bell Peppers", price: 20 },
    { name: "Black Olives", price: 30 },
    { name: "Jalapenos", price: 25 },
    { name: "Mushrooms", price: 25 },
    { name: "Onions", price: 15 },
    { name: "Spinach", price: 25 },
    { name: "Sweet Corn", price: 20 },
    { name: "Tomatoes", price: 15 }
  ];

  // VEGGIE TOGGLE

  const toggleVeggie = (item) => {
    const exists = veggies.find((veg) => veg.name === item.name);

    if (exists) {
      setVeggies(veggies.filter((veg) => veg.name !== item.name));
    } else {
      setVeggies([...veggies, item]);
    }
  };

  // TOTAL

  const veggieTotal = veggies.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const total =
    (base?.price || 0) +
    (sauce?.price || 0) +
    (cheese?.price || 0) +
    veggieTotal;
  
const handlePayment = () => {
  setProcessing(true);

  setTimeout(() => {

    // save custom pizza
    localStorage.setItem(
      "customOrder",
      JSON.stringify({
        name: "Custom Pizza 🍕",
        price: total,
        base: base?.name,
        sauce: sauce?.name,
        cheese: cheese?.name,
        veggies: veggies.map((veg) => veg.name)
      })
    );

    // remove old normal pizza order
    localStorage.removeItem("currentOrder");

    navigate("/orders");

  }, 2500);
};

  return (
    <>
      <Navbar />

      <section className="build-page">

        {/* LEFT SIDE */}

        <div className="build-left">

          <h1>Build Your Pizza</h1>
          <p>Follow the steps to craft your perfect slice.</p>

          {/* STEP 1 */}

          <div className="builder-section">
            <h3>🔴 1 Choose your Pizza Base</h3>

            <div className="option-grid">

              {baseOptions.map((item) => (
                <div
                  className={`option-card ${base?.name === item.name ? "selected" : ""}`}
                  onClick={() => setBase(item)}
                >
                  {item.name}
                  <span>+₹{item.price}</span>
                </div>
              ))}

            </div>
          </div>


          {/* STEP 2 */}

          <div className="builder-section">
            <h3>🔴 2 Pick a Sauce</h3>

            <div className="option-grid">

              {sauceOptions.map((item) => (
                <div
                  className={`option-card ${sauce?.name === item.name ? "selected" : ""}`}
                  onClick={() => setSauce(item)}
                >
                  {item.name}
                  <span>+₹{item.price}</span>
                </div>
              ))}

            </div>
          </div>


          {/* STEP 3 */}

          <div className="builder-section">
            <h3>🔴 3 Select a Cheese</h3>

            <div className="option-grid">

              {cheeseOptions.map((item) => (
                <div
                  className={`option-card ${cheese?.name === item.name ? "selected" : ""}`}
                  onClick={() => setCheese(item)}
                >
                  {item.name}
                  <span>+₹{item.price}</span>
                </div>
              ))}

            </div>
          </div>


          {/* STEP 4 */}

          <div className="builder-section">
            <h3>🔴 4 Add Veggies (optional)</h3>

            <div className="veggie-grid">

              {veggieOptions.map((item) => (
                <div
                  className={`option-card ${
                    veggies.find((veg) => veg.name === item.name)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => toggleVeggie(item)}
                >
                  {item.name}
                  <span>+₹{item.price}</span>
                </div>
              ))}

            </div>
          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="build-right">

          <h2>🍕 Your Pizza</h2>

          <p>Base: {base?.name || "—"}</p>

          <p>Sauce: {sauce?.name || "—"}</p>

          <p>Cheese: {cheese?.name || "—"}</p>

          <p>
            Veggies:{" "}
            {veggies.length > 0
              ? veggies.map((veg) => veg.name).join(", ")
              : "None selected"}
          </p>

          <hr />

          <h3>Total ₹{total}</h3>

        <button
         onClick={() => setShowPayment(true)}
          disabled={!(base && sauce && cheese)}
        > 
           {base && sauce && cheese
              ? "Checkout"
              : "Complete steps 1-3"}
         </button>

        </div>

      {showPayment && (

  <div className="payment-overlay">

    <div className="payment-box">

      <h2>Secure Checkout</h2>

      <p>Total ₹{total}</p>

      <input
        type="text"
        placeholder="Card Number"
      />

      <input
        type="text"
        placeholder="Expiry MM/YY"
      />

      <input
        type="text"
        placeholder="CVC"
      />

      <button onClick={handlePayment}>

  {processing
    ? "Processing payment..."
    : `Pay ₹${total}`}

</button>

      <button
        className="close-btn"
        onClick={() => setShowPayment(false)}
      >
        Cancel
      </button>

    </div>

  </div>

)}

      </section>
    </>
  );
}

export default BuildPizza;