import Navbar from "../components/Navbar";

function Orders() {

  const menuOrder =
    JSON.parse(localStorage.getItem("currentOrder"));

  const customOrder =
    JSON.parse(localStorage.getItem("customOrder"));

  const order = customOrder || menuOrder;

  return (
    <>
      <Navbar />

      <section className="orders-page">

        <h1>My Orders</h1>

        <p>Track your pizzas in real time.</p>

        <div className="success-box">

          <h3>✅ Order placed successfully!</h3>

          {order ? (
            <>

              <h2>{order.name}</h2>

              <p>
                <strong>Price:</strong> ₹{order.price}
              </p>

              {/* ONLY show for custom pizza */}

              {order.base && (
                <>
                  <p>
                    <strong>Base:</strong> {order.base}
                  </p>

                  <p>
                    <strong>Sauce:</strong> {order.sauce}
                  </p>

                  <p>
                    <strong>Cheese:</strong> {order.cheese}
                  </p>

                  <p>
                    <strong>Veggies:</strong>{" "}
                    {order.veggies.length > 0
                      ? order.veggies.join(", ")
                      : "None"}
                  </p>
                </>
              )}

              <p>
                <strong>Status:</strong> Preparing 👨‍🍳
              </p>

              <p>
                <strong>Estimated delivery:</strong> 15 mins
              </p>

            </>
          ) : (
            <p>No order found.</p>
          )}

        </div>

      </section>
    </>
  );
}

export default Orders;