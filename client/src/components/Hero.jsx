import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-text">

        <span className="hero-badge">
          🍕 Freshly baked, made your way
        </span>

        <h1>
          Your perfect <span className="pizza-word">pizza</span>,
          <br />
          built from scratch.
        </h1>

        <p>
          Choose from chef's favorites or craft your own masterpiece — base,
          sauce, cheese and all the toppings you love.
        </p>

        <div className="hero-buttons">

          {/* START BUILDING */}

          <button
            className="hero-btn"
            onClick={() => navigate("/build")}
          >
            Start building →
          </button>


          {/* BROWSE MENU */}

          <button
            className="secondary-btn"
            onClick={() => navigate("/menu")}
          >
            Browse menu
          </button>

        </div>

      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
          alt="pizza"
        />
      </div>

    </section>
  );
}

export default Hero;