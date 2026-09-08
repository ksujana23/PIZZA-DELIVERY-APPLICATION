import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";          // ← ADD THIS
import PizzaMenu from "./pages/PizzaMenu";
import BuildPizza from "./pages/BuildPizza";
import Orders from "./pages/Orders";
import PizzaRecommendation from "./pages/PizzaRecommendation";
import MysteryPizza from "./pages/MysteryPizza";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/menu" element={<PizzaMenu />} />

        <Route path="/build" element={<BuildPizza />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/recommend" element={<PizzaRecommendation />} />
        <Route path="/mystery" element={<MysteryPizza />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;