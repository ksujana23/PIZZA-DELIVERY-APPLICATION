import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <div className="logo-circle">🍕</div>
        <span className="brand-name">Slice & Co.</span>
      </div>

      {/* CENTER */}
      <div className="nav-center">

        <Link to="/">Home</Link>

        {token && (
          <>
            <Link to="/menu">Menu</Link>
            <Link to="/build">Build a Pizza</Link>
            <Link to="/orders">My Orders</Link>
          </>
        )}

      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {!token ? (
          <Link to="/auth" className="login-link">
            Log in
          </Link>
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