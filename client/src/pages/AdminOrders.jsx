import { useEffect, useState } from "react";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH ALL ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders/admin/all"
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


  // =====================================================
  // LOAD ORDERS
  // =====================================================

  useEffect(() => {
    fetchOrders();
  }, []);


  // =====================================================
  // MARK ORDER AS DELIVERED
  // =====================================================

  const markAsDelivered = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/admin/deliver/${orderId}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Order marked as delivered!");

        // Refresh orders
        fetchOrders();
      } else {
        alert(data.message || "Failed to update order");
      }

    } catch (error) {
      console.error("Delivery error:", error);

      alert("Something went wrong");
    }
  };


  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="admin-page">

      <div className="admin-header">

        <p className="admin-label">
          ADMIN PANEL
        </p>

        <h1>
          All Pizza Orders 🍕
        </h1>

        <p>
          Manage customer orders and update delivery status.
        </p>

      </div>


      {/* LOADING */}

      {loading && (
        <div className="admin-message">
          Loading orders...
        </div>
      )}


      {/* NO ORDERS */}

      {!loading && orders.length === 0 && (
        <div className="admin-message">
          No orders found.
        </div>
      )}


      {/* ORDERS */}

      {!loading && orders.length > 0 && (

        <div className="admin-orders-list">

          {orders.map((order) => (

            <div
              className="admin-order-card"
              key={order._id}
            >

              <div className="admin-order-top">

                <div>

                  <span className="admin-order-id">
                    ORDER #{order._id.slice(-6)}
                  </span>

                  <h2>
                    {order.pizzaName}
                  </h2>

                </div>


                <span
                  className={`admin-status ${
                    order.status === "Delivered"
                      ? "delivered"
                      : "pending"
                  }`}
                >
                  ● {order.status}
                </span>

              </div>


              <div className="admin-order-details">

                <div>
                  <span>Quantity</span>
                  <strong>
                    {order.quantity}
                  </strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>
                    ₹{order.totalPrice}
                  </strong>
                </div>

                <div>
                  <span>Ordered on</span>
                  <strong>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </strong>
                </div>

              </div>


              {/* DELIVER BUTTON */}

              {order.status !== "Delivered" && (

                <button
                  className="deliver-btn"
                  onClick={() =>
                    markAsDelivered(order._id)
                  }
                >
                  ✓ Mark as Delivered
                </button>

              )}


              {/* DELIVERED MESSAGE */}

              {order.status === "Delivered" && (

                <div className="delivered-message">
                  ✓ Delivered successfully
                  {order.deliveredAt && (
                    <span>
                      {" "}
                      •{" "}
                      {new Date(
                        order.deliveredAt
                      ).toLocaleTimeString()}
                    </span>
                  )}
                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminOrders;