import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // check login
  const isLoggedIn = localStorage.getItem("token");

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("token");

    // optional cleanup
    localStorage.removeItem("currentOrder");
    localStorage.removeItem("customOrder");

    navigate("/");

    // refresh navbar immediately
    window.location.reload();
  };

  return (
    <nav className="navbar">

      {/* Left */}
      <div className="nav-left">
        <div className="logo-circle">🍕</div>
        <span className="brand-name">
          Slice & Co.
        </span>
      </div>

      {/* Center */}

      <div className="nav-center">

        <Link to="/">Home</Link>

        {isLoggedIn && (
          <>
            <Link to="/menu">Menu</Link>

            <Link to="/build">
              Build a Pizza
            </Link>

            <Link to="/orders">
              My Orders
            </Link>
          </>
        )}

      </div>


      {/* Right */}

      <div className="nav-right">

        {!isLoggedIn ? (
          <>
            <Link
              to="/auth"
              className="login-link"
            >
              Log in
            </Link>

            <Link to="/menu">
              <button className="order-btn">
                Order now
              </button>
            </Link>
          </>
        ) : (
          <button
            className="order-btn"
            onClick={handleLogout}
          >
            Sign out
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;