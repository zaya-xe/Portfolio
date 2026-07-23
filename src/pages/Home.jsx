import "./Home.scss";
import Navbar from "../components/Navbar/Navbar";
// import GlassShards from "../components/GlassShards/GlassShards";
import shardsBG from "../assets/shardsBG.svg";
import Hero from "../components/Hero/Hero";
import Games from "../components/Games/Games";

export default function Home() {
  return (
    <div className="portfolio-container">
      {/* <GlassShards /> */}
      <div className="page-bg" style={{ backgroundImage: `url(${shardsBG})` }}>
        <div className="navbar-container">
          <Navbar />
        </div>
        <Hero />
      </div>
      <Games />
      {/* Case studies, Certifications, and Contact sections come back here
          once the new visual language above is signed off. */}
    </div>
  );
}
