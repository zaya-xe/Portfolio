import { useState, useRef, useEffect } from "react";
import "./Games.scss";
import shardsBG2 from "../../assets/shardsBG2.svg";
import chess2 from "../../assets/chess2.svg";
import bloomOrDoom from "../../assets/BloomorDoom.png";
import reelReveal from "../../assets/reelReveal.png";

const GAMES = [
  {
    id: "bloom-or-doom",
    title: "Bloom or Doom",
    image: bloomOrDoom,
    description:
      "Bloom or Doom is a 3-day game jam project, featured in the 'Games and Animation Digest' by Kingston University. The objective of the 2-player game is to balance the Sun and Moon to save a dying planet, handle mishaps and use the NFC power-up to your advantage.",
    docUrl: "#",
    buttonLabel: "Download APK",
  },
  {
    id: "chess-2-0",
    title: "Chess 2.0",
    image: chess2,
    description:
      "Chess 2.0 is a unique take on the traditional Chess, introducing new rules, enhancing the original moves based on decades of player feedback and reaching a new height of strategies.",
    docUrl:
      "https://docs.google.com/document/d/1_qhZnu0KQnrzz0PCcqbeHTuKBIwPlCEVm2guc_GxAPk/edit?usp=sharing",
    buttonLabel: "View GDD",
  },
  {
    id: "reel-reveal",
    title: "Reel Reveal",
    image: reelReveal,
    description:
      "Reel Reveal is a casual word-guessing game where players uncover a hidden movie title using a limited number of lives. The gameplay emphasizes quick thinking, logical deduction, and replayability across three progressively challenging difficulty levels.",
    docUrl: "#",
    buttonLabel: "Download APK",
  },
];

export default function Games() {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect();
          const scrollableDistance = wrapper.offsetHeight - window.innerHeight;
          const scrolled = -rect.top;
          const progress = Math.min(
            1,
            Math.max(0, scrolled / scrollableDistance)
          );
          const index = Math.min(
            GAMES.length - 1,
            Math.floor(progress * GAMES.length)
          );
          setActiveIndex(index);
        }
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scrollableDistance = wrapper.offsetHeight - window.innerHeight;
    const targetProgress = index / GAMES.length + 0.05; // nudge into that panel's range
    const targetScrollY =
      wrapper.offsetTop + targetProgress * scrollableDistance;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <div
      className="games-scroll-wrapper"
      ref={wrapperRef}
      style={{ height: `${GAMES.length * 100}vh` }}
    >
      <section
        id="games"
        className="games"
        style={{ backgroundImage: `url("${shardsBG2}")` }}
      >

        <div className="games__layout">
        <div className="games__nav-column">
            <h2 className="games__heading">Games</h2>
            <div className="games__nav">
            <div className="games__nav-line" />
            <div
                className="games__nav-indicator"
                style={{ transform: `translateY(${activeIndex * 56}px)` }}
            />
            {GAMES.map((game, index) => (
                <button
                key={game.id}
                className={`games__nav-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => scrollToIndex(index)}
                >
                {game.title}
                </button>
            ))}
            </div>
        </div>

          <div className="games__stage">
            {GAMES.map((game, index) => (
              <div
                className={`games__panel ${
                  activeIndex === index ? "active" : ""
                }`}
                key={game.id}
              >
                <h3 className="games__panel-title">{game.title}</h3>

                <div className="games__mockup">
                  <img src={game.image} alt={`${game.title} preview`} />
                </div>

            <div className="games__panel-copy">
                <p className="games__panel-description">
                  {game.description}
                </p>

                <a
                  className="games__case-study-btn"
                  href={game.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {game.buttonLabel}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11L11 3M11 3H5M11 3V9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}