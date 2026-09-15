import { useState, useRef, useEffect } from "react";
import "./Navbar.scss";

const NAV_ITEMS = [
  { id: "about", label: "About me" },
  {
    id: "case-studies",
    label: "Case studies",
    hasCaret: true,
    dropdown: [
      { id: "games", label: "Games" },
      { id: "product", label: "Products" },
    ],
  },
  { id: "certifications", label: "Certifications" },
  // { id: "contact", label: "Let's talk" },
];

export default function Navbar({ activeId = "about", onNavigate }) {
  const [active, setActive] = useState(activeId);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const triggerRefs = useRef({});

  const handleClick = (item) => {
    if (item.dropdown) {
      setOpenDropdown(openDropdown === item.id ? null : item.id);
      return;
    }
    setActive(item.id);
    setOpenDropdown(null);
    if (onNavigate) onNavigate(item.id);
    const el = document.getElementById(item.id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDropdownItemClick = (subItem) => {
    setActive(subItem.id);
    setOpenDropdown(null);
    if (onNavigate) onNavigate(subItem.id);
    const el = document.getElementById(subItem.id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // close dropdown when clicking outside the navbar
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // close dropdown on Escape and return focus to its trigger
  useEffect(() => {
    if (!openDropdown) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        triggerRefs.current[openDropdown]?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown]);

  // keep the highlighted nav item in sync with whichever section is
  // actually in view while scrolling, instead of only updating on click
  useEffect(() => {
    const sectionIds = NAV_ITEMS.flatMap((item) =>
      item.dropdown ? item.dropdown.map((sub) => sub.id) : [item.id]
    );
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActive(mostVisible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar__left">
        Mawrah Khan<span className="navbar__dot">.</span>
      </div>

      <div className="navbar__right">
        {NAV_ITEMS.map((item) => (
          <div className="navbar__item-wrapper" key={item.id}>
            <button
              ref={(el) => (triggerRefs.current[item.id] = el)}
              className={
                active === item.id ||
                item.dropdown?.some((sub) => sub.id === active)
                  ? "active"
                  : ""
              }
              onClick={() => handleClick(item)}
              {...(item.dropdown && {
                "aria-haspopup": "true",
                "aria-expanded": openDropdown === item.id,
                "aria-controls": `navbar-dropdown-${item.id}`,
              })}
            >
              {item.label}
              {item.hasCaret && (
                <svg
                  className={`navbar__caret ${openDropdown === item.id ? "navbar__caret--open" : ""}`}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {item.dropdown && openDropdown === item.id && (
              <div
                className="navbar__dropdown"
                id={`navbar-dropdown-${item.id}`}
              >
                {item.dropdown.map((subItem) => (
                  <button
                    key={subItem.id}
                    className="navbar__dropdown-link"
                    onClick={() => handleDropdownItemClick(subItem)}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}