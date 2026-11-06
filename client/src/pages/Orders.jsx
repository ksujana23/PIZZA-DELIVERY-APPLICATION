
import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import "./Orders.css";

const API_URL = "https://pizza-backend-j05r.onrender.com";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from Render
  const fetchOrders = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setOrders([]);
        setError("Please login to view your orders.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/api/orders?userId=${encodeURIComponent(userId)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch your orders."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid orders response from server.");
      }

      setOrders(data);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and automatic refresh
  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  // Remove delivered orders after 3 minutes
  useEffect(() => {
    const timers = [];

    orders.forEach((order) => {
      if (order.status === "Delivered" && order.deliveredAt) {
        const deliveredTime = new Date(
          order.deliveredAt
        ).getTime();

        const threeMinutes = 3 * 60 * 1000;
        const remainingTime =
          threeMinutes - (Date.now() - deliveredTime);

        if (remainingTime <= 0) {
          setOrders((previous) =>
            previous.filter((item) => item._id !== order._id)
          );
          return;
        }

        const timer = setTimeout(() => {
          setOrders((previous) =>
            previous.filter((item) => item._id !== order._id)
          );
        }, remainingTime);

        timers.push(timer);
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [orders]);

  return (
    <>
      <Navbar />

      <div className="orders-page">
        <div className="orders-header">
          <p className="orders-label">ORDER HISTORY</p>

          <h1>
            Your Pizza <span>Orders 🍕</span>
          </h1>

          <p className="orders-subtitle">
            Every slice you've ordered, all in one place.
          </p>
        </div>

        {loading && (
          <div className="orders-message">
            <div className="message-icon">🍕</div>
            <h2>Loading your orders...</h2>
          </div>
        )}

        {!loading && error && (
          <div className="orders-message">
            <div className="message-icon">⚠️</div>
            <h2>Couldn't load your orders</h2>
            <p>{error}</p>
            <button onClick={fetchOrders}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="orders-message">
            <div className="message-icon">🍕</div>
            <h2>No orders yet</h2>
            <p>
              Your delicious pizza journey starts here.
            </p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div className="order-card" key={order._id}>
                <div className="order-card-top">
                  <div className="order-number">
                    ORDER #{orders.length - index}
                  </div>

                  <div
                    className={`order-status ${
                      order.status?.toLowerCase() === "pending"
                        ? "pending"
                        : "completed"
                    }`}
                  >
                    ● {order.status}
                  </div>
                </div>

                <div className="pizza-order-title">
                  <div className="pizza-icon">🍕</div>

                  <div>
                    <h2>{order.pizzaName}</h2>

                    <p>
                      {order.quantity} pizza
                      {order.quantity > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="order-info">
                  <div className="info-item">
                    <span>Quantity</span>
                    <strong>{order.quantity}</strong>
                  </div>

                  <div className="info-item">
                    <span>Ordered on</span>
                    <strong>
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </strong>
                  </div>

                  <div className="info-item total-item">
                    <span>Total</span>
                    <strong>₹{order.totalPrice}</strong>
                  </div>
                </div>

                {order.pizzaName === "Custom Pizza" &&
                  order.customDetails && (
                    <div className="custom-details">
                      <h3>✨ Your Custom Pizza</h3>

                      <div className="custom-grid">
                        <div>
                          <span>Base</span>
                          <strong>
                            {order.customDetails.base || "N/A"}
                          </strong>
                        </div>

                        <div>
                          <span>Sauce</span>
                          <strong>
                            {order.customDetails.sauce || "N/A"}
                          </strong>
                        </div>

                        <div>
                          <span>Cheese</span>
                          <strong>
                            {order.customDetails.cheese || "N/A"}
                          </strong>
                        </div>

                        <div>
                          <span>Veggies</span>
                          <strong>
                            {order.customDetails.veggies?.length > 0
                              ? order.customDetails.veggies.join(", ")
                              : "None"}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}

                {order.customDetails?.type ===
                  "Recommended Pizza" && (
                  <div className="custom-details">
                    <h3>✨ Recommendation Details</h3>
                    <p>
                      Mood: {order.customDetails.mood || "N/A"}
                    </p>
                    <p>
                      Match: {order.customDetails.matchScore ?? "N/A"}%
                    </p>
                  </div>
                )}

                {order.customDetails?.type ===
                  "Mystery Pizza" && (
                  <div className="custom-details">
                    <h3>🎁 Mystery Pizza</h3>
                    <p>
                      {order.customDetails.description || ""}
                    </p>
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
