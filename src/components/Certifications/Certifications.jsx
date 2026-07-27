import { useState } from "react";
import "./Certifications.scss";

import cert1 from "../../assets/certs/microsoft-ai.jpg";
import cert2 from "../../assets/certs/game-design.jpg";
import cert3 from "../../assets/certs/rizvi-tank.jpg";
import cert4 from "../../assets/certs/google-ux.jpg";
import cert5 from "../../assets/certs/game-development.jpg";
import shardsBG4 from "../../assets/shardsBG4.svg";

const CERTIFICATIONS = [
  {
    id: "microsoft-ai",
    title: "Azure AI Fundamentals",
    org: "Microsoft",
    image: cert1,
  },
  {
    id: "game-design",
    title: "Introduction to Game Design",
    org: "Epic Games",
    image: cert2,
  },
  {
    id: "3rd-prize",
    title: "3rd Prize Winner",
    org: "Rays Tech Fest 2023",
    image: cert3,
  },
  {
    id: "google-ux",
    title: "Start the UX Design Process",
    org: "Google",
    image: cert4,
  },
  {
    id: "game-development",
    title: "Introduction to Game Development",
    org: "Michigan State University",
    image: cert5,
  },
];

const TOTAL = CERTIFICATIONS.length;

// wraps a raw index into 0...TOTAL-1
const mod = (n, m) => ((n % m) + m) % m;

// finds the shortest signed offset between two indices on a circular track
const getOffset = (index, activeIndex, total) => {
  let raw = index - activeIndex;
  if (raw > total / 2) raw -= total;
  if (raw < -total / 2) raw += total;
  return raw;
};

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(2);

  const goPrev = () => setActiveIndex((i) => mod(i - 1, TOTAL));
  const goNext = () => setActiveIndex((i) => mod(i + 1, TOTAL));

  return (
    <section
      id="certifications"
      className="certifications"
      style={{ "--bg-image": `url("${shardsBG4}")` }}
    >
      <h2 className="certifications__heading">Certifications</h2>

      <div className="certifications__track">
        {CERTIFICATIONS.map((cert, index) => {
          const offset = getOffset(index, activeIndex, TOTAL);
          const distance = Math.abs(offset);
          const scale = Math.max(0.45, 1 - distance * 0.22);
          const spacing = 62;

          return (
            <div
              key={cert.id}
              className={`certifications__card ${offset === 0 ? "is-active" : ""}`}
              style={{
                transform: `translateX(${offset * spacing}%) scale(${scale})`,
                opacity: distance > 3 ? 0 : 1 - distance * 0.22,
                zIndex: 10 - distance,
              }}
            >
              <img src={cert.image} alt={`${cert.title} certificate`} />
            </div>
          );
        })}
      </div>

      <div className="certifications__controls">
        <button
          className="certifications__arrow certifications__arrow--prev"
          onClick={goPrev}
          aria-label="Previous certificate"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="certifications__label">
          <p className="certifications__title">{CERTIFICATIONS[activeIndex].title}</p>
          <p className="certifications__org">{CERTIFICATIONS[activeIndex].org}</p>
        </div>

        <button
          className="certifications__arrow certifications__arrow--next"
          onClick={goNext}
          aria-label="Next certificate"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}