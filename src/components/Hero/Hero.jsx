import "./Hero.scss";
import { useState } from "react";
import rolebg1 from "../../assets/rolebg1.svg";
import rolebg2 from "../../assets/rolebg2.svg";
import rolebg3 from "../../assets/rolebg3.svg";
import role1 from "../../assets/role1.svg";
import role2 from "../../assets/role2.svg";
import role3 from "../../assets/role3.svg";
import resumePDF from "../../assets/Mawrah_CV.pdf";

const ROLES = [
  {
    id: "uxd",
    label: ["User", "Experience", "Design"],
    bg: rolebg1,
    description:
      "Research driven user centered design to understand people and their behaviours, and create meaningful interactions.",
    icon: (
      <img src={role1} alt="User Experience Design icon" className="role-card__icon-img" />
    ),
  },
  {
    id: "uid",
    label: ["User", "Interface", "Design"],
    bg: rolebg2,
    description:
      "Effective interfaces designed to visually appeal, communicate brand identity and encourage engagement.",
    icon: (
      <img src={role2} alt="User Interface Design icon" className="role-card__icon-img" />
    ),
  },
  {
    id: "accessibility",
    label: ["Accessibility"],
    bg: rolebg3,
    description:
      "Inclusive experiences designed to remove barriers and ensure products are intuitive for everyone.",
    icon: (
      <img src={role3} alt="Accessibility icon" className="role-card__icon-img" />
    ),
  },
];

export default function Hero() {
  const [flippedId, setFlippedId] = useState(null);

  const toggleCard = (id) => {
    setFlippedId((current) => (current === id ? null : id));
  };
  return (
    <section id="about" className="hero">
      <div className="hero__copy">
        <p className="hero__eyebrow">Hi, I am</p>
        <h1 className="hero__name">Mawrah Khan</h1>
        <p className="hero__description">
          A seasoned UXer, crafting intuitive and accessible<br/>interfaces, to make the world a better place.
        </p>

        <a className="hero__resume-btn" href={resumePDF} target="_blank" rel="noopener noreferrer">
          View resume
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <p className="hero__role-label">My role:</p>
        <div className="hero__roles">
        {ROLES.map((role) => (
          <button
            type="button"
            className={`role-card ${flippedId === role.id ? "is-flipped" : ""}`}
            key={role.id}
            style={{ backgroundImage: `url("${role.bg}")` }}
            onClick={() => toggleCard(role.id)}
            aria-pressed={flippedId === role.id}
          >
            <div className="role-card__inner">
              <div className="role-card__face">
                <span className="role-card__icon">{role.icon}</span>
                <span className="role-card__label">
                  {role.label.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < role.label.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </div>
              <p className="role-card__description">{role.description}</p>
            </div>
          </button>
        ))}
      </div>
      </div>
    </section>
  );
}