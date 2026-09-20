import "./Home.scss";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import ShardBurst from "../components/Hero/ShardBurst";
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
    </>
  );
}
