
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const API_URL = "https://pizza-backend-j05r.onrender.com/api/auth";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !password) {
      setError("Please enter your name and password.");
      return;
    }

    if (!isLogin && !email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        const res = await axios.post(`${API_URL}/login`, {
          name: name.trim(),
          password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful!");
        navigate("/", { replace: true });

      } else {
        const res = await axios.post(`${API_URL}/register`, {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password
        });

        alert(res.data.message || "Account created successfully!");

        setName("");
        setEmail("");
        setPassword("");
        setIsLogin(true);
      }

    } catch (err) {
      console.error("Authentication error:", err);

      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-left">

        <h2 className="auth-logo">🍕 Slice & Co.</h2>

        <div className="auth-text">
          <h1>
            Great pizza is
            <br />
            just a few clicks
            <br />
            away.
          </h1>

          <p>
            Sign in to build custom pizzas, reorder favorites
            and track every delivery live.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">

        <h2>Welcome back</h2>

        <p className="auth-subtitle">
          Sign in or create an account to continue.
        </p>

        {/* LOGIN / SIGNUP TOGGLE */}
        <div className="auth-toggle">

          <button
            type="button"
            className={isLogin ? "active-tab" : ""}
            onClick={() => {
              setIsLogin(true);
              setError("");
              setPassword("");
            }}
          >
            Log in
          </button>

          <button
            type="button"
            className={!isLogin ? "active-tab" : ""}
            onClick={() => {
              setIsLogin(false);
              setError("");
              setPassword("");
            }}
          >
            Signup
          </button>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder={isLogin ? "Enter your name or email" : "Enter your name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="username"
            required
          />

          {!isLogin && (
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          )}

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
          />

          {error && (
            <p style={{
              color: "#DC2626",
              marginBottom: "15px",
              fontSize: "14px"
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Log in"
                : "Create Account"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Auth;
