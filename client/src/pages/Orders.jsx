import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders"
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="orders-page">

        {/* HEADER */}

        <div className="orders-header">
          <p className="orders-label">ORDER HISTORY</p>

          <h1>
            Your Pizza <span>Orders 🍕</span>
          </h1>

          <p className="orders-subtitle">
            Every slice you've ordered, all in one place.
          </p>
        </div>


        {/* LOADING */}

        {loading && (
          <div className="orders-message">
            <div className="message-icon">🍕</div>
            <h2>Loading your orders...</h2>
          </div>
        )}


        {/* NO ORDERS */}

        {!loading && orders.length === 0 && (
          <div className="orders-message">
            <div className="message-icon">🍕</div>

            <h2>No orders yet</h2>

            <p>
              Your delicious pizza journey starts here.
            </p>
          </div>
        )}


        {/* ORDERS */}

        {!loading && orders.length > 0 && (
          <div className="orders-list">

            {orders.map((order, index) => (

              <div
                className="order-card"
                key={order._id}
              >

                {/* TOP */}

                <div className="order-card-top">

                  <div className="order-number">
                    ORDER #{orders.length - index}
                  </div>

                  <div
                    className={`order-status ${
                      order.status?.toLowerCase() ===
                      "pending"
                        ? "pending"
                        : "completed"
                    }`}
                  >
                    ● {order.status}
                  </div>

                </div>


                {/* PIZZA NAME */}

                <div className="pizza-order-title">

                  <div className="pizza-icon">
                    🍕
                  </div>

                  <div>
                    <h2>
                      {order.pizzaName}
                    </h2>

                    <p>
                      {order.quantity} pizza
                      {order.quantity > 1
                        ? "s"
                        : ""}
                    </p>
                  </div>

                </div>


                {/* BASIC DETAILS */}

                <div className="order-info">

                  <div className="info-item">
                    <span>Quantity</span>

                    <strong>
                      {order.quantity}
                    </strong>
                  </div>

                  <div className="info-item">
                    <span>Ordered on</span>

                    <strong>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </strong>
                  </div>

                  <div className="info-item total-item">
                    <span>Total</span>

                    <strong>
                      ₹{order.totalPrice}
                    </strong>
                  </div>

                </div>


                {/* CUSTOM PIZZA */}

                {order.pizzaName ===
                  "Custom Pizza" &&
                  order.customDetails && (

                    <div className="custom-details">

                      <h3>
                        ✨ Your Custom Pizza
                      </h3>

                      <div className="custom-grid">

                        <div>
                          <span>Base</span>

                          <strong>
                            {order.customDetails.base}
                          </strong>
                        </div>

                        <div>
                          <span>Sauce</span>

                          <strong>
                            {order.customDetails.sauce}
                          </strong>
                        </div>

                        <div>
                          <span>Cheese</span>

                          <strong>
                            {order.customDetails.cheese}
                          </strong>
                        </div>

                        <div>
                          <span>Veggies</span>

                          <strong>
                            {order.customDetails
                              .veggies?.length > 0
                              ? order.customDetails.veggies.join(
                                  ", "
                                )
                              : "None"}
                          </strong>
                        </div>

                      </div>

                    </div>
                  )}

              </div>

            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default Orders;