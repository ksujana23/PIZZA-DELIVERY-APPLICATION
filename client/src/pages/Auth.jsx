import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );

        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        navigate("/menu");

      } else {
        await axios.post(
          "http://localhost:5000/api/auth/register",
          { name, email, password }
        );

        alert("Account created successfully");
        setIsLogin(true);
      }

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT */}
      <div className="auth-left">

        <div className="auth-logo">
          🍕 Slice & Co.
        </div>

        <div className="auth-text">
          <h1>Great pizza is just a few clicks away.</h1>

          <p>
            Sign in to build custom pizzas,
            reorder favorites and track every delivery live.
          </p>
        </div>

      </div>


      {/* RIGHT */}
      <div className="auth-right">

        <h2 className="auth-heading">
          Welcome back
        </h2>

        <p className="auth-subtext">
          Sign in or create an account to continue.
        </p>


        <div className="auth-toggle">

          <button
            className={isLogin ? "active-tab" : ""}
            onClick={() => setIsLogin(true)}
          >
            Log in
          </button>

          <button
            className={!isLogin ? "active-tab" : ""}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>

        </div>


        {!isLogin && (
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="auth-btn"
          onClick={handleSubmit}
        >
          {isLogin ? "Log in" : "Create Account"}
        </button>

      </div>

    </div>
  );
}

export default Auth;