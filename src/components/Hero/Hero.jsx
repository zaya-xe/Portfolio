import "./Hero.scss";
import { useState, useEffect } from "react";
import rolebg1 from "../../assets/rolebg1.svg";
import rolebg2 from "../../assets/rolebg2.svg";
import rolebg3 from "../../assets/rolebg3.svg";
import role1 from "../../assets/role1.svg";
import role2 from "../../assets/role2.svg";
import role3 from "../../assets/role3.svg";
import resumePDF from "../../assets/Mawrah_CV.pdf";
import keyboardIcon from "../../assets/keyboard.svg";
import screenReaderIcon from "../../assets/screen_reader.svg";
import contrastIcon from "../../assets/contrast.svg";
import motionIcon from "../../assets/motion.svg";

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

const A11Y_HIGHLIGHTS = [
  { id: "keyboard", icon: keyboardIcon, label: ["Keyboard", "Friendly"] },
  {
    id: "screen-reader",
    icon: screenReaderIcon,
    label: ["Screen Reader", "Optimised"],
  },
  { id: "contrast", icon: contrastIcon, label: ["High", "Contrast"] },
  { id: "motion", icon: motionIcon, label: ["Reduced Motion", "Support"] },
];

export default function Hero() {
  const [flippedId, setFlippedId] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(null);

  const toggleCard = (id) => {
    setFlippedId((current) => (current === id ? null : id));
  };

  // 100vw includes the scrollbar's width, which clips the right edge of a
  // full-bleed element when a vertical scrollbar is present; measure the
  // actual usable width (documentElement.clientWidth excludes it) instead.
  useEffect(() => {
    const updateWidth = () => setViewportWidth(document.documentElement.clientWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <section id="about" className="hero">
      <div className="hero__copy">
        <p className="hero__eyebrow">Hi, I am</p>
        <h1 className="hero__name">Mawrah Khan</h1>
        <p className="hero__description">
          Designing intuitive, accessible experiences<br/>where people, technology, and play come together.
        </p>

        <a className="hero__resume-btn" href={resumePDF} target="_blank" rel="noopener noreferrer">
          View CV
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

      <div
        className="hero__a11y-banner"
        style={viewportWidth ? { width: `${viewportWidth}px` } : undefined}
      >
        <p className="hero__a11y-title">
          Accessible
          <br />
          <span className="hero__a11y-title-accent">by design.</span>
        </p>

        <div className="hero__a11y-divider" aria-hidden="true" />

        <p className="hero__a11y-description">
          I create products and platforms that meet{" "}
          <span className="hero__a11y-term">WCAG 2.2 AA</span> standards,
          ensuring inclusive experiences for every user. This portfolio
          serves as a live demonstration of accessible design principles in
          practice.
        </p>

        <div className="hero__a11y-divider" aria-hidden="true" />

        <ul className="hero__a11y-highlights">
          {A11Y_HIGHLIGHTS.map((item) => (
            <li className="hero__a11y-highlight" key={item.id}>
              <img src={item.icon} alt="" className="hero__a11y-highlight-icon" />
              <span className="hero__a11y-highlight-label">
                {item.label.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < item.label.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}