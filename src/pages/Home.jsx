import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Home.scss";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import ShardBurst from "../components/Hero/ShardBurst";
import Games from "../components/Games/Games";
import Products from "../components/Products/Products";
import Certifications from "../components/Certifications/Certifications";
import Footer from "../components/Footer/Footer";

export default function Home() {
  // other pages (e.g. a case study) send people here via the navbar with the
  // section they picked, since that section doesn't exist on their page
  const { state } = useLocation();
  useEffect(() => {
    if (!state?.scrollTo) return;
    if (state.scrollTo === "about") {
      // the navbar sits above the hero section; land on the real top so it
      // isn't scrolled out of view
      window.scrollTo(0, 0);
      return;
    }
    document
      .getElementById(state.scrollTo)
      ?.scrollIntoView({ behavior: "instant" });
  }, [state]);

  return (
    <div className="portfolio-container">
      <div className="page-bg">
        <ShardBurst />
        <div className="navbar-container">
          <Navbar />
        </div>
        <Hero />
      </div>
      <Games />
      <Products />
      <Certifications />
      <Footer />
    </div>
  );
}
