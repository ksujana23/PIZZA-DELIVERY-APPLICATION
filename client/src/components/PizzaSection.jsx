function PizzaSection() {
  const pizzas = [
    {
      name: "Classic Margherita",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143"
    },
    {
      name: "Pepperoni Feast",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e"
    },
    {
      name: "Veggie Supreme",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    }
  ];

  return (
    <section className="pizza-section">

      <div className="pizza-top">

        <div className="pizza-heading">
          <h2>Crowd favorites</h2>
          <p>The pizzas everyone keeps coming back for.</p>
        </div>

        <div className="view-all">
          View all →
        </div>

      </div>

      <div className="pizza-grid">
        {pizzas.map((pizza, index) => (
          <div key={index} className="pizza-card">

            <img src={pizza.image} alt="" />

            <div className="pizza-info">
              <h3>{pizza.name}</h3>
              <span>₹{pizza.price}</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default PizzaSection;