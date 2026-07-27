import "./Home.scss";
import Navbar from "../components/Navbar/Navbar";
import shardsBG from "../assets/shardsBG.svg";
import Hero from "../components/Hero/Hero";
import Games from "../components/Games/Games";
import Products from "../components/Products/Products";
import MobileBlock from "../components/MobileBlock/MobileBlock";
import Certifications from "../components/Certifications/Certifications";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <> 
      <MobileBlock />

    <div className="portfolio-container">
      <div className="page-bg" style={{ backgroundImage: `url(${shardsBG})` }}>
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
    </>
  );
}
