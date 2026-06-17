import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import PizzaSection from "../components/PizzaSection";
import Footer from "../components/Footer";

function Home() {
  return (
  <div className="main-container">
  <Navbar />
  <Hero />
  <Features />
  <PizzaSection />
  <Footer />
</div>
  );
}

export default Home;