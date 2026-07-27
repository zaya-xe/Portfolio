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

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar__left">
        Mawrah Khan<span className="navbar__dot">.</span>
      </div>

      <div className="navbar__right">
        {NAV_ITEMS.map((item) => (
          <div className="navbar__item-wrapper" key={item.id}>
            <button
              className={active === item.id ? "active" : ""}
              onClick={() => handleClick(item)}
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
              <div className="navbar__dropdown">
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