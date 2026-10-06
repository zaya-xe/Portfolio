import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const triggerRefs = useRef({});
  const hamburgerRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const navigate = useNavigate();

  // On the home page the section is right there; anywhere else (e.g. a case
  // study page) there's nothing to scroll to, so go home and let Home scroll.
  const goToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) {
      navigate("/", { state: { scrollTo: id } });
    } else if (id === "about") {
      // the navbar sits above the hero section, so scrolling to the section
      // itself would push the navbar off screen — go to the real top instead
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = (item) => {
    if (item.dropdown) {
      setOpenDropdown(openDropdown === item.id ? null : item.id);
      return;
    }
    setActive(item.id);
    setOpenDropdown(null);
    setMobileOpen(false);
    if (onNavigate) onNavigate(item.id);
    goToSection(item.id);
  };

  const handleDropdownItemClick = (subItem) => {
    setActive(subItem.id);
    setOpenDropdown(null);
    setMobileOpen(false);
    if (onNavigate) onNavigate(subItem.id);
    goToSection(subItem.id);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
    hamburgerRef.current?.focus();
  };

  // close dropdown when clicking outside the navbar (the mobile panel is
  // portalled to <body>, so it's checked separately from navRef)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const inNav = navRef.current?.contains(e.target);
      const inMobilePanel = mobilePanelRef.current?.contains(e.target);
      if (!inNav && !inMobilePanel) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Escape closes whichever layer is open — the dropdown first (returning
  // focus to its trigger, desktop or mobile, whichever is actually visible),
  // otherwise the mobile menu itself (returning focus to the hamburger).
  useEffect(() => {
    if (!openDropdown && !mobileOpen) return;
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (openDropdown) {
        const id = openDropdown;
        setOpenDropdown(null);
        triggerRefs.current[`desktop-${id}`]?.focus();
        triggerRefs.current[`mobile-${id}`]?.focus();
        return;
      }
      closeMobileMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown, mobileOpen]);

  // lock background scroll while the mobile menu is open, and move focus
  // into the panel so keyboard users land somewhere sensible
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstFocusable = mobilePanelRef.current?.querySelector("button, a");
    firstFocusable?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

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

  // Rendered twice — once for the desktop row, once for the mobile panel —
  // since the two need very different layouts (floating dropdown vs inline
  // accordion). They share the same active/openDropdown state either way.
  const renderNavItems = (variant) =>
    NAV_ITEMS.map((item) => (
      <div className="navbar__item-wrapper" key={item.id}>
        <button
          ref={(el) => (triggerRefs.current[`${variant}-${item.id}`] = el)}
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
            "aria-controls": `navbar-dropdown-${variant}-${item.id}`,
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
            className={
              variant === "desktop"
                ? "navbar__dropdown"
                : "navbar__dropdown navbar__dropdown--inline"
            }
            id={`navbar-dropdown-${variant}-${item.id}`}
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
    ));

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar__left">
        Mawrah Khan<span className="navbar__dot">.</span>
      </div>

      <div className="navbar__right">{renderNavItems("desktop")}</div>

      <button
        ref={hamburgerRef}
        type="button"
        className="navbar__hamburger"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        aria-controls="navbar-mobile-panel"
        onClick={() => setMobileOpen((open) => !open)}
      >
        <span className={`navbar__hamburger-bar ${mobileOpen ? "is-open" : ""}`} />
        <span className={`navbar__hamburger-bar ${mobileOpen ? "is-open" : ""}`} />
        <span className={`navbar__hamburger-bar ${mobileOpen ? "is-open" : ""}`} />
      </button>

      {createPortal(
        <>
          {/* portalled to <body>: .navbar has backdrop-filter, which creates
              a new containing block for position:fixed descendants, so a
              fixed panel nested inside it would anchor to the navbar's own
              (much narrower) box instead of the viewport */}
          <div
            className={`navbar__backdrop ${mobileOpen ? "is-open" : ""}`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          <div
            id="navbar-mobile-panel"
            className={`navbar__mobile-panel ${mobileOpen ? "is-open" : ""}`}
            ref={mobilePanelRef}
          >
            {renderNavItems("mobile")}
          </div>
        </>,
        document.body
      )}
    </nav>
  );
}
