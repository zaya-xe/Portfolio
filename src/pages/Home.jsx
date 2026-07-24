import "./Home.scss";
import Navbar from "../components/Navbar/Navbar";
import shardsBG from "../assets/shardsBG.svg";
import Hero from "../components/Hero/Hero";
import Games from "../components/Games/Games";
import Products from "../components/Products/Products";
import MobileBlock from "../components/MobileBlock/MobileBlock";

export default function Home() {
  return (
    <> {/* NEW: wrap everything in a fragment */}
      <MobileBlock /> {/* NEW */}

    <div className="portfolio-container">
      <div className="page-bg" style={{ backgroundImage: `url(${shardsBG})` }}>
        <div className="navbar-container">
          <Navbar />
        </div>
        <Hero />
      </div>
      <Games />
      <Products />
      {/* Case studies, Certifications, and Contact sections come back here
          once the new visual language above is signed off. */}
    </div>
    </>
  );
}
