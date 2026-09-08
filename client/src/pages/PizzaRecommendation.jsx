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

import "./PizzaRecommendation.css";

function PizzaRecommendation() {
  const navigate = useNavigate();

  const [mood, setMood] = useState("");
  const [budget, setBudget] = useState("");
  const [hunger, setHunger] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  const pizzas = [
    {
      name: "Classic Margherita",
      price: 399,
      image: margherita,
      tags: ["cheesy", "veggie"],
      popularity: 4,
      hunger: "light",
    },
    {
      name: "Veggie Supreme",
      price: 449,
      image: veggie,
      tags: ["veggie"],
      popularity: 5,
      hunger: "regular",
    },
    {
      name: "Pepperoni Feast",
      price: 599,
      image: pepperoni,
      tags: ["meaty", "spicy", "cheesy"],
      popularity: 5,
      hunger: "heavy",
    },
    {
      name: "Spicy Paneer Tikka",
      price: 649,
      image: paneer,
      tags: ["spicy", "veggie", "cheesy"],
      popularity: 5,
      hunger: "regular",
    },
    {
      name: "Four Cheese",
      price: 799,
      image: fourcheese,
      tags: ["cheesy"],
      popularity: 4,
      hunger: "heavy",
    },
    {
      name: "BBQ Chicken",
      price: 849,
      image: bbq,
      tags: ["meaty"],
      popularity: 4,
      hunger: "heavy",
    },
    {
      name: "Corn & Cheese",
      price: 999,
      image: corncheese,
      tags: ["cheesy", "veggie"],
      popularity: 4,
      hunger: "light",
    },
    {
      name: "Mexican Fiesta",
      price: 1049,
      image: mexican,
      tags: ["spicy", "veggie", "cheesy"],
      popularity: 4,
      hunger: "regular",
    },
    {
      name: "Mushroom Delight",
      price: 1199,
      image: mushroom,
      tags: ["veggie", "cheesy"],
      popularity: 4,
      hunger: "light",
    },
    {
      name: "Tandoori Chicken",
      price: 1249,
      image: tandoorichicken,
      tags: ["spicy", "meaty"],
      popularity: 5,
      hunger: "heavy",
    },
  ];

  // Check whether pizza fits selected budget
  const fitsBudget = (pizza) => {
    if (budget === "low") {
      return pizza.price < 500;
    }

    if (budget === "medium") {
      return pizza.price >= 500 && pizza.price <= 800;
    }

    if (budget === "high") {
      return pizza.price > 800;
    }

    return false;
  };

  const getRecommendation = () => {
    if (!mood || !budget || !hunger) {
      alert("Please select all your preferences first!");
      return;
    }

    const scoredPizzas = pizzas.map((pizza) => {
      let score = 0;
      const reasons = [];

      // 1. TASTE MATCH - 50 points
      if (pizza.tags.includes(mood)) {
        score += 50;
        reasons.push(`Matches your ${mood} craving`);
      }

      // 2. BUDGET MATCH - 30 points
      if (fitsBudget(pizza)) {
        score += 30;

        if (budget === "low") {
          reasons.push("Fits your under ₹500 budget");
        } else if (budget === "medium") {
          reasons.push("Fits your ₹500–₹800 budget");
        } else {
          reasons.push("Fits your ₹800+ budget");
        }
      }

      // 3. HUNGER MATCH - 20 points
      if (pizza.hunger === hunger) {
        score += 20;

        if (hunger === "light") {
          reasons.push("A lighter choice for you");
        } else if (hunger === "regular") {
          reasons.push("A balanced and filling choice");
        } else {
          reasons.push("Perfect for a big appetite");
        }
      }

      // Popularity is used as a tie-breaker
      const popularityScore = pizza.popularity * 2;
      score += popularityScore;

      if (pizza.popularity >= 5) {
        reasons.push("A popular choice among customers");
      }

      return {
        ...pizza,
        score,
        matchScore: Math.round((score / 110) * 100),
        reasons,
      };
    });

    scoredPizzas.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.price - b.price;
    });

    setRecommendation(scoredPizzas[0]);
  };

  return (
    <>
      <Navbar />

      <section className="recommend-page">

        <div className="recommend-container">

          {/* HEADING */}
          <div className="recommend-heading">

            <h1>
              Find Your Perfect Pizza 🍕
            </h1>

            <p>
              Tell us what you're craving and we'll find your perfect match.
            </p>

          </div>

          {/* CRAVING */}
          <div className="recommend-section">

            <h2>
              What are you craving?
            </h2>

            <p>
              Choose the flavour that matches your mood.
            </p>

            <div className="options">

              <button
                className={
                  mood === "spicy"
                    ? "option selected"
                    : "option"
                }
                onClick={() => setMood("spicy")}
              >
                🌶️
                <span>Spicy</span>
              </button>

              <button
                className={
                  mood === "cheesy"
                    ? "option selected"
                    : "option"
                }
                onClick={() => setMood("cheesy")}
              >
                🧀
                <span>Cheesy</span>
              </button>

              <button
                className={
                  mood === "veggie"
                    ? "option selected"
                    : "option"
                }
                onClick={() => setMood("veggie")}
              >
                🥬
                <span>Veggie</span>
              </button>

              <button
                className={
                  mood === "meaty"
                    ? "option selected"
                    : "option"
                }
                onClick={() => setMood("meaty")}
              >
                🍗
                <span>Meaty</span>
              </button>

            </div>

          </div>

          {/* BUDGET */}
          <div className="recommend-section">

            <h2>
              What's your budget?
            </h2>

            <p>
              Let us know how much you want to spend.
            </p>

            <div className="budget-options">

              <button
                className={
                  budget === "low"
                    ? "budget selected"
                    : "budget"
                }
                onClick={() => setBudget("low")}
              >
                💰 Under ₹500
              </button>

              <button
                className={
                  budget === "medium"
                    ? "budget selected"
                    : "budget"
                }
                onClick={() => setBudget("medium")}
              >
                💎 ₹500 - ₹800
              </button>

              <button
                className={
                  budget === "high"
                    ? "budget selected"
                    : "budget"
                }
                onClick={() => setBudget("high")}
              >
                👑 ₹800+
              </button>

            </div>

          </div>

          {/* HUNGER */}
          <div className="recommend-section">

            <h2>
              How hungry are you? 🍽️
            </h2>

            <p>
              Tell us how filling you want your pizza to be.
            </p>

            <div className="budget-options">

              <button
                className={
                  hunger === "light"
                    ? "budget selected"
                    : "budget"
                }
                onClick={() => setHunger("light")}
              >
                🍃 Light
              </button>

              <button
                className={
                  hunger === "regular"
                    ? "budget selected"
                    : "budget"
                }
                onClick={() => setHunger("regular")}
              >
                🍕 Regular
              </button>

              <button
                className={
                  hunger === "heavy"
                    ? "budget selected"
                    : "budget"
                }
                onClick={() => setHunger("heavy")}
              >
                🔥 Very Hungry
              </button>

            </div>

          </div>

          {/* FIND BUTTON */}
          <button
            className="find-button"
            onClick={getRecommendation}
          >
            ✨ Find My Pizza
          </button>

          {/* RESULT */}
          {recommendation && (
            <div className="recommend-result">

              <div className="result-title">

                <span>🎯</span>

                <div>
                  <h2>Your Perfect Match</h2>

                  <p>
                    Based on your taste, budget and appetite
                  </p>
                </div>

              </div>

              <div className="result-card">

                {/* IMAGE */}
                <div className="result-image">

                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                  />

                </div>

                {/* DETAILS */}
                <div className="result-details">

                  <div className="result-name-row">

                    <h3>
                      {recommendation.name}
                    </h3>

                    <span className="result-price">
                      ₹{recommendation.price}
                    </span>

                  </div>

                  <div className="match-badge">
                    🔥 {recommendation.matchScore}% Match
                  </div>

                  <div className="why-box">

                    <h4>
                      ✨ Why this pizza?
                    </h4>

                    <p>
                      We picked{" "}
                      <strong>
                        {recommendation.name}
                      </strong>{" "}
                      because it matches your{" "}
                      <strong>{mood}</strong>{" "}
                      craving, fits your{" "}
                      <strong>
                        {budget === "low"
                          ? "under ₹500"
                          : budget === "medium"
                          ? "₹500–₹800"
                          : "₹800+"}
                      </strong>{" "}
                      budget, and is a good choice for your{" "}
                      <strong>
                        {hunger === "light"
                          ? "lighter appetite"
                          : hunger === "regular"
                          ? "regular appetite"
                          : "big appetite"}
                      </strong>.
                    </p>

                  </div>

                  <div className="result-tags">

                    <span>
                      🍕 Personalized
                    </span>

                    <span>
                      ⭐ Smart Recommendation
                    </span>

                  </div>

                  <button
                    className="order-recommended"
                    onClick={() => navigate("/menu")}
                  >
                    Order This Pizza →
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>

      </section>
    </>
  );
}

export default PizzaRecommendation;