import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";          // ← ADD THIS
import PizzaMenu from "./pages/PizzaMenu";
import BuildPizza from "./pages/BuildPizza";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/menu" element={<PizzaMenu />} />

        <Route path="/build" element={<BuildPizza />} />

        <Route path="/orders" element={<Orders />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;