import { useState, useRef, useEffect } from "react";
import "./Products.scss";
import shardsBG3 from "../../assets/shardsBG3.svg";
import steamRevamp from "../../assets/steamRevamp.png";
import spectraAR from "../../assets/spectraAR.png";

const PRODUCTS = [
  {
    id: "steam-revamp",
    title: "Steam Revamp",
    image: steamRevamp,
    description:
      "As one of the primary platforms for discovering and playing games, Steam serves millions of players. However, further analysis revealed several opportunities to improve accessibility and create a more inclusive, user-friendly experience.",
    docUrl: "https://www.figma.com/slides/4ezhdrVqJ9NxD5vDwQmyLz",
    buttonLabel: "View Revamp",
  },
  {
    id: "spectra-ar",
    title: "Spectra AR",
    image: spectraAR,
    description:
      "Education is reaching new heights, and performing medical experiments in AR could be the new possible push that inspires future doctors. Spectra AR is an application that enables students to explore human anatomy through augmented reality.",
    docUrl: "https://miro.com/app/board/uXjVJ6aygAk=/?share_link_id=572648822591",
    buttonLabel: "View Project",
  },
];

export default function Products() {
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
            PRODUCTS.length - 1,
            Math.floor(progress * PRODUCTS.length)
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
    const targetProgress = index / PRODUCTS.length + 0.05;
    const targetScrollY =
      wrapper.offsetTop + targetProgress * scrollableDistance;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <div
      className="products-scroll-wrapper"
      ref={wrapperRef}
      style={{ height: `${PRODUCTS.length * 100}vh` }}
    >
      <section
        id="product"
        className="products"
        style={{ backgroundImage: `url("${shardsBG3}")` }}
      >
        <div className="products__layout">
          <div className="products__nav-column">
            <h2 className="products__heading">Products</h2>
            <div className="products__nav">
              <div className="products__nav-line" />
              <div
                className="products__nav-indicator"
                style={{ transform: `translateY(${activeIndex * 56}px)` }}
              />
              {PRODUCTS.map((product, index) => (
                <button
                  key={product.id}
                  className={`products__nav-item ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => scrollToIndex(index)}
                >
                  {product.title}
                </button>
              ))}
            </div>
          </div>

          <div className="products__stage">
            {PRODUCTS.map((product, index) => (
              <div
                className={`products__panel ${
                  activeIndex === index ? "active" : ""
                }`}
                key={product.id}
              >
                <h3 className="products__panel-title">{product.title}</h3>

                <div className="products__mockup">
                  <img src={product.image} alt={`${product.title} preview`} />
                </div>

                <div className="products__panel-copy">
                  <p className="products__panel-description">
                    {product.description}
                  </p>

                  <a
                    className="products__case-study-btn"
                    href={product.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.buttonLabel}
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